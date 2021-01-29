import { BODY_TYPE, STATUS_CODE } from '../consts/index.js';
import { jsonify, compareObject } from '../utils/index.js';

const getParams = (queryString) => {
  if (queryString) {
    const queryList = queryString.split('&');
    const result = {};
    queryList.forEach((query) => {
      const [key, value] = query.split('=');
      result[key] = value;
    })
    return result;
  } else {
    return null;
  }
}

const getAccessToken = (authorizationHeader) => {
  if (authorizationHeader) {
    const [,token] = authorizationHeader.split(' ');
    return token;
  } else {
    return null;
  }
}

export const requestHandler = async ({ request, response }) => {
  const routes = await jsonify('./routes.json');
  
  const [endpoint, query] = request.serverRequest.url.split('?');
  const method = request.method.toLowerCase();
  const accessToken = getAccessToken(request.headers.get('authorization'));
  const body = await request.body();
  const params = getParams(query);

  const route =
    routes.find(
      (route) =>
        route.endpoint === endpoint && route.method.toLowerCase() === method
    );

  if (route) {
    const json = await body.value;

    let collection;
    switch (body.type) {
      case BODY_TYPE.json:
        collection = route.collections.find(
          (collection) => collection.request.type === BODY_TYPE.json &&
            collection.request.access_token === accessToken &&
            compareObject(collection.request.body, json) &&
            compareObject(collection.request.params, params)
        );
        break;
      default:
        collection = route.collections.find(
          (collection) => collection.request.access_token === accessToken &&
            compareObject(collection.request.body, json) &&
            compareObject(collection.request.params, params)
        );
    }

    if (collection) {
      response.status = collection.response.status;
      response.body = await jsonify(`./data/${collection.response.body}`);
    } else {
      response.status = STATUS_CODE.notFound;
      response.body = { message: 'Not Found' };
    }
  } else {
    response.status = STATUS_CODE.notFound;
    response.body = { message: 'Not Found' };
  }
}
