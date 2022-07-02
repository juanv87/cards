import axios from "axios";

const NotesApi = axios.create({
  baseURL: "/api",
});

export default NotesApi;
