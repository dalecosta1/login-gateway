import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/users/";

const getPublicContent = () => {
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const getUserBoard = () => {
  var usr = JSON.parse(localStorage.getItem("user"));

  return axios.get(API_URL + usr.id, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
