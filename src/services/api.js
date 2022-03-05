import Axios from "axios";

const api = new Axios.create({
  baseURL: "https://62220ea9666291106a1b9ead.mockapi.io/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;