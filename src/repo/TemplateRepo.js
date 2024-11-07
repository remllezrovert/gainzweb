import axios from "axios";
import AuthService from "../services/auth.service";




const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/template`;



const getAll = async () => {
  const config = AuthService.getHeaderConfig(); 

  try {
    const response = await axios.get(`${API_URL}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching template data:", error);
    throw error;
  }
};



const getById= async (templateId) => {
  const config = AuthService.getHeaderConfig(); 
  try {
    const response = await axios.get(`${API_URL}/${templateId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching template data:", error);
    throw error;
  }
};


const postRequest = async (template) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.post(`${API_URL}/`, template, config); 
    return response.data;
  } catch (error) {
    console.error("Error posting template data:", error);
    throw error;
  }
};




const patchRequest = async (templateId, templateData) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.patch(`${API_URL}/${templateId}/`, templateData, config); 
    return response.data;
  } catch (error) {
    console.error("Error updating template data:", error);
    throw error;
  }
};


const deleteRequest= async (templateId) => {
  const config = AuthService.getHeaderConfig();
  try {
    const response = await axios.delete(`${API_URL}/${templateId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting template:", error); // Log any error
    throw error;
  }
};






const TemplateRepo = {
  getAll,
  getById,
  postRequest,
  patchRequest,
  deleteRequest
};

export default TemplateRepo;