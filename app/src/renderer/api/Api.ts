import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 4800,
});

export default Api;
