import { STATUS_CODE } from '../consts/index.js';

export const errorHandler = async ({ response }, next) => {
  try {
    await next();
  } catch (err) {
    response.status = STATUS_CODE.internalServerError;
    response.body = { message: err.message };
  }
}
