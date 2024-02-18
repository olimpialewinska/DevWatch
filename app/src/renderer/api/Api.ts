import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3009",
  timeout: 4800,
});

export default Api;
