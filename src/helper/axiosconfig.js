import axios from "axios";

const instance = axios.create({
  // baseURL: "https://brainylingo.azurewebsites.net/api/",
  // baseURL: "http://localhost:9000/api/",
  baseURL: "https://brainlybackend-june-13.onrender.com/api/",
  withCredentials: true,
});

export default instance;
