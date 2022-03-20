import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (
  username, 
  email, 
  password, 
  firstName, 
  lastName, 
  dateOfBirthday, 
  sex, 
  country,
  city,
  address,
  postCode,
  phonePrefix,
  phoneNumber) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    firstName, 
    lastName, 
    dateOfBirthday, 
    sex, 
    country,
    city,
    address,
    postCode,
    phonePrefix,
    phoneNumber,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      email:username,
      password:password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const verifyUser = (code) => {
  return axios.get(API_URL + "confirm/" + code).then((response) => {
    return response.data;
  });
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser,
};
