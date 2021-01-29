export const jsonify = async (path) => {
  return JSON.parse(await Deno.readTextFile(path));
}
