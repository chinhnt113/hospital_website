import axios from "axios";
import { API_URL } from "../contexts/constants";

export const getAllDoctors = async () => {
  try {
    await axios.get(`${API_URL}/doctors`).then((response) => {
      if (response.data.success) {
        return response.data.doctors;
      }
      return null;
    });
  } catch (error) {
    return null;
  }
};

export const getAllMajors = async () => {
  try {
    const response = await axios.get(`${API_URL}/majors`);
    if (response.data.success) {
      return response.data.majors;
    }
    return null;
  } catch (error) {
    return null;
  }
};
