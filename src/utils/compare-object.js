export const compareObject = (objectA, objectB) => {
  if (!objectA && !objectB) return true;
  if (!(objectA instanceof Object) || !(objectB instanceof Object)) return false;

  for (let key in objectA) {
    if (!objectB.hasOwnProperty(key)) return false;
    if (objectA[key] === objectB[key]) continue;
    if (!compareObject(objectA[key], objectB[key])) return false;
  }

  for (let key in objectB) {
    if (!objectA.hasOwnProperty(key)) return false;
  }

  return true;
}
