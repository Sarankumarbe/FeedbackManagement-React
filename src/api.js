import axios from "axios";

const API_URL = "http://localhost:5000/api/feedbacks"; // Correct endpoint

// Get all feedbacks
export const getFeedbacks = () => axios.get(API_URL);

// Get feedback by ID
export const getFeedbackById = async (id) => {
    try {
      console.log("Fetching feedback by ID:", id);
      const response = await axios.get(`${API_URL}/${id}`);
      console.log("API Response for getFeedbackById:", response);
      return response;
    } catch (error) {
      console.error("Error in getFeedbackById:", error.response || error.message);
      throw error;
    }
  };

// Add feedback
export const addFeedback = (data) => axios.post(API_URL, data);

// Update feedback
export const updateFeedback = (id, data) => axios.put(`${API_URL}/${id}`, data, {
  headers: {
    "Content-Type": "multipart/form-data", // Ensure the content type for form data
  },
});

// Delete feedback
export const deleteFeedback = (id) => axios.delete(`${API_URL}/${id}`);
