import axios from "axios";

const API_URL = "http://remllez.com:8081/template/";

const getMe = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.token) {
    throw new Error("User is not authenticated");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}me`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const TemplateRepo = {
  getMe,
};

export default TemplateRepo;