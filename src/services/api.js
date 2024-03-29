import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default class API {
  constructor() {
    this.http = axios;
    this.baseURL = "https://localhost:7126/" || "/";
    this.token = JSON.parse(localStorage.getItem("token")) || "";
    this.init();
  }

  init() {
    if (this.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    }
  }

  getUrl(url = "") {
    return this.baseURL + url;
  }

  get(url = "", config = {}) {
    return this.http.get(this.getUrl(url), config);
  }

  post(url = "", body, config = {}) {
    return this.http.post(this.getUrl(url), body, config);
  }
}
