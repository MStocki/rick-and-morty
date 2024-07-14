const prepareUrl = (endpoint) => {
  const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
  return baseUrl + endpoint;
};

export { prepareUrl };
