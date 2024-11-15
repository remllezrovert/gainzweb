import axios from "axios";
import {jwtDecode} from "jwt-decode";
import ClientRepo from "../repo/ClientRepo";

//const API_URL = "http://localhost:3000/api/auth/";
const API_URL = "http://remllez.com:8081/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  })
  .then(response => {
    // Registration successful, store the email in localStorage
    localStorage.setItem("email", email);
    //console.log(email)
    return response.data;
  })
  .catch(error => {
    // Handle registration error if needed
    console.error("Registration error:", error);
    throw error;
  });
};

//const login = (email, password) => {
//  return axios
//    .post(API_URL + "login", {
//      email,
//      password,
//    })
//    .then((response) => {
//      if (response.data.user) { //changed from username
//        localStorage.setItem("user", JSON.stringify(response.data));
//      }
//
//      return response.data;
//    });
//};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", { email, password })
    .then((response) => {
      if (response.data.token) {
        const user = jwtDecode(response.data.token);
          user.roles = user.roles || ["user"]; // Set to ["user"] if roles are undefined
          user.email = user.sub;
          user.token = response.data.token;
          
        localStorage.setItem("user", JSON.stringify({
          token: response.data.token,
          expiresIn: response.data.expiresIn,
          ...user 
        }));




      }

      return response.data;
    })
    .catch((error) => {
      console.error("Login error:", error);
      throw error; 
    });
};

const verify = (email, verificationCode) => {
  return axios
    .post(API_URL + "verify", { email, verificationCode })
    .then((response) => {
      // Handle the response as needed
      // For example, you might store the user data if verification logs the user in
      return response.data;
    })
    .catch((error) => {
      console.error("Verification error:", error);
      throw error;
    });
};








const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};





const getHeaderConfig = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    throw new Error("User is not authenticated");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return config;
}



const AuthService = {
  register,
  login,
  verify,
  logout,
  getCurrentUser,
  getHeaderConfig
}

export default AuthService;
