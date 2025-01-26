import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm"; // Reusing the same form
import { getFeedbackById, updateFeedback } from "../api"; // API functions

const EditFeedbackPage = ({ onEdit, onClose }) => {
  const { id } = useParams(); // Get the feedback ID from the URL
  const [initialData, setInitialData] = useState(null); // Store feedback data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        console.log("Fetching feedback by ID:", id);
        const response = await getFeedbackById(id); // API call
        console.log("API Response for Feedback:", response);

        if (response?.data?.data?.length) {
          setInitialData(response.data.data[0]); // Use response.data.data[0]
        } else {
          throw new Error("Feedback not found");
        }
      } catch (err) {
        console.error("Error fetching feedback:", err.message || err);
        setError("Failed to load feedback. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFeedback();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const response = await updateFeedback(id, formData); // Update feedback via API
      if (response.status === 200) {
        console.log("Feedback updated:", response.data);
        onEdit(response.data); // Update the feedback list in the parent component
        onClose(); // Close the modal or navigate away
      } else {
        throw new Error("Failed to update feedback");
      }
    } catch (err) {
      console.error("Error updating feedback:", err);
      setError("Failed to update feedback. Please try again later.");
    }
  };

  if (loading) {
    return <div className="text-light">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-dark rounded p-4 shadow-lg" style={{ minWidth: "400px" }}>
        <h2 className="mb-4 text-center text-light">Edit Feedback</h2>
        {initialData && (
          <FeedbackForm
            initialData={initialData} // Pass the fetched feedback data
            onSubmit={handleSubmit} // Handle form submission
            onClose={onClose} // Close the modal
          />
        )}
      </div>
    </div>
  );
};

export default EditFeedbackPage;
