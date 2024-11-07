import axios from "axios";
import AuthService from "../services/auth.service";



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/form`;




const getAll = async () => {
  const config = AuthService.getHeaderConfig(); 

  try {
    const response = await axios.get(`${API_URL}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
};

const getById = async (formId) => {
  const config = AuthService.getHeaderConfig(); 
  try {
    const response = await axios.get(`${API_URL}/${formId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
};



const postRequest = async (file) => {
  const config = AuthService.getHeaderConfig();


  const formData = new FormData();
  formData.append("file", file);  // "file" is the field name expected by the backend

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        ...config.headers,  // Include authorization headers from AuthService
        "Content-Type": "multipart/form-data",  // Set the content type for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading form:", error);
    throw error;
  }
};

// Function to patch an existing form (with file upload)
const patchRequest = async (formId, file) => {
  const config = AuthService.getHeaderConfig();

  // Create FormData to handle file upload
  const formData = new FormData();
  formData.append("file", file);  // "file" is the field name expected by the backend

  try {
    const response = await axios.patch(`${API_URL}/${formId}/`, formData, {
      headers: {
        ...config.headers,  // Include authorization headers from AuthService
        "Content-Type": "multipart/form-data",  // Set the content type for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating form:", error);
    throw error;
  }
};

const deleteRequest = async (formId) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.delete(`${API_URL}/${formId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting form:", error);
    throw error;
  }
};

const FormRepo = {
  getAll,
  getById,
  postRequest,
  patchRequest,
  deleteRequest,
};

export default FormRepo;
