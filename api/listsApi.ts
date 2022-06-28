import axios from "axios";

const listsApi = axios.create({
  baseURL: "/api",
});

export default listsApi;
