import axios from "axios";

export default axios.create({
  baseURL: "http://remllez.com:8081",
  headers: {
    "Content-type": "application/json"
  }
});
