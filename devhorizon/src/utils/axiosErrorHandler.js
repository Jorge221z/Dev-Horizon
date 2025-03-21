// axiosErrorHandler.js
// axiosErrorHandler.js
export function errorHandler(err) {
  let errorMessage = "Error desconocido";
  
  if (err?.response) {
    errorMessage = err.response.data?.message || err.message;
  } else if (err?.message) {
    errorMessage = err.message;
  }

  return new Error(errorMessage);
}