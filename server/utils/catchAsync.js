export default function (callback) {
  return (request, response, next) => {
    callback(request, response, next).catch(next);
  };
}
