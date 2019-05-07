import http from "./httpService";

export default apiEndpoint => {
  return http.get(apiEndpoint);
};
