import axios from "axios";

class RequestConfig {
  baseURL;
  headers;
  method;
  url;
  data;

  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  setToken(token) {
    if (token) {
      this.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  get(path, config) {
    this.method = "GET";
    this.url = this.baseURL + path;

    return { ...config, ...this };
  }

  delete(path, config) {
    this.method = "DELETE";
    this.url = this.baseURL + path;

    return { ...config, ...this };
  }

  post(path, data, config) {
    this.method = "POST";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  put(path, data, config) {
    this.method = "PUT";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  patch(path, data, config) {
    this.method = "PATCH";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }
}

export const base = () => {
  const requestConfig = new RequestConfig(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_ID}`
  );
  requestConfig.setToken(process.env.AIRTABLE_KEY);
  return axios.create(requestConfig);
};
