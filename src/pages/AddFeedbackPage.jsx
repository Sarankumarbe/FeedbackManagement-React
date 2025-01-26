import React, { useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import { addFeedback } from "../api"; // Import addFeedback function

const AddFeedbackPage = ({ onAdd, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle button state

  const handleAdd = async (formData) => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true); // Set submitting state

    try {
      const response = await addFeedback(formData); // Use the axios API method

      if (response.status === 201) {
        console.log("Feedback created:", response.data);
        onAdd(response.data); // Optional: update feedback list if needed
        onClose(); // Close the popup
      } else {
        throw new Error("Failed to create feedback");
      }
    } catch (error) {
      console.error("Error adding feedback:", error);
    } finally {
      setIsSubmitting(false); // Reset the submitting state after completion
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-dark rounded p-4 shadow-lg" style={{ minWidth: "400px" }}>
        <h2 className="mb-4 text-center text-light">Add Feedback</h2>
        <FeedbackForm onSubmit={handleAdd} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddFeedbackPage;
