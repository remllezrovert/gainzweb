import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "http://remllez.com:8081/client/";

const getMe = async () => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.get(`${API_URL}me`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const ClientRepo = {
  getMe,
};

export default ClientRepo;