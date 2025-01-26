import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // for navigation (React Router v6)

const FeedbackItem = ({ feedback, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for alert dialog
  const menuRef = useRef(null);
  const navigate = useNavigate(); // React Router hook for navigation

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleDelete = async () => {
    setShowAlert(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await onDelete(feedback.id); // Call onDelete prop to delete feedback
      window.location.reload(); // Refresh the page to show updated feedback list
    } catch (error) {
      console.error("Error deleting feedback:", error);
    } finally {
      setShowAlert(false); // Close dialog
      setMenuVisible(false); // Close menu
    }
  };

  const handleEdit = () => {
    navigate(`/edit-feedback/${feedback.id}`); // Navigate to Edit Feedback page
    setMenuVisible(false); // Close menu after navigation
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="card bg-secondary text-light h-100 position-relative">
      <div className="card-body">
        <h5 className="card-title">{feedback.title}</h5>
        <p className="card-text">{feedback.description}</p>
        <div className="mb-3">
          <span className="badge bg-primary me-2">{feedback.platform}</span>
          <span className="badge bg-success me-2">{feedback.module}</span>
          {feedback.tags.split(",").map((tag, index) => (
            <span key={index} className="badge bg-warning text-dark me-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="position-absolute top-0 end-0 p-2">
        <button
          className="btn btn-light btn-sm"
          onClick={toggleMenu}
          aria-label="Options"
        >
          &#x22EE;
        </button>
        {menuVisible && (
          <div
            ref={menuRef}
            className="dropdown-menu show position-absolute"
            style={{
              top: "30px",
              right: "10px",
              zIndex: 10,
            }}
          >
            <button className="dropdown-item" onClick={handleEdit}>
              Edit Feedback
            </button>
            <button className="dropdown-item text-danger" onClick={handleDelete}>
              Delete Feedback
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Alert Dialog */}
      {showAlert && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="bg-dark rounded p-4 shadow-lg text-center">
            <h5 className="mb-3">Are you sure you want to delete this feedback?</h5>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowAlert(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;
