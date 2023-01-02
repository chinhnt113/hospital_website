import axios from "axios";
import { apiUrl } from "./constants";

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/doctors`);
    if (response.data.success) {
      return response.data.doctors;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getAllMajors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/majors`);
    if (response.data.success) {
      return response.data.majors;
    }
    return null;
  } catch (error) {
    return null;
  }
}