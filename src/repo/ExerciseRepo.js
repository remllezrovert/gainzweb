import axios from "axios";
import AuthService from "../services/auth.service";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/exercise`;

const getAll = async () => {
  const config = AuthService.getHeaderConfig(); 

  try {
    const response = await axios.get(`${API_URL}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    throw error;
  }
};



const getById= async (exerciseId) => {
  const config = AuthService.getHeaderConfig(); 
  try {
    const response = await axios.get(`${API_URL}/${exerciseId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    throw error;
  }
};



const getByDateRange = async (clientId, startDate, endDate, limit) => {
  const config = AuthService.getHeaderConfig(); 
  try {
    const response = await axios.get(`${API_BASE_URL}${clientId}/exercise/date`, {
      params: {
        startDate: startDate,  // Format the date ('YYYY-MM-DD') java.sql.date
        endDate: endDate,
        limit: limit
      },
      ...config // Add auth headers
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching exercise data by date range:", error);
    throw error;
  }
};




const postRequest = async (exercise) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.post(`${API_URL}/`, exercise, config); 
    return response.data;
  } catch (error) {
    console.error("Error posting exercise data:", error);
    throw error;
  }
};




const patchRequest = async (exerciseId, templateData) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.patch(`${API_URL}/${exerciseId}/`, templateData, config); 
    return response.data;
  } catch (error) {
    console.error("Error updating exercise data:", error);
    throw error;
  }
};


const deleteRequest= async (exerciseId) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.delete(`${API_URL}/${exerciseId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting exercise:", error); // Log any error
    throw error;
  }
};




const ExerciseRepo = {
  getAll,
  getById,
  getByDateRange,
  postRequest,
  patchRequest,
  deleteRequest
};

export default ExerciseRepo;