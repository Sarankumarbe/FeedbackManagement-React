import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AddFeedbackPage from "./pages/AddFeedbackPage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import { getFeedbacks, addFeedback, updateFeedback, deleteFeedback } from "./api";

const App = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getFeedbacks().then((res) => {
      console.log("Feedbacks API response:", res.data); // Debugging log
      setFeedbacks(res.data.data); // Access the 'data' property
    });
  }, []);

  const handleAddFeedback = (data) => {
    addFeedback(data).then(() =>
      getFeedbacks().then((res) => setFeedbacks(res.data))
    );
  };

  const handleEditFeedback = (id, data) => {
    updateFeedback(id, data).then(() =>
      getFeedbacks().then((res) => setFeedbacks(res.data))
    );
  };

  const handleDeleteFeedback = (id) => {
    deleteFeedback(id).then(() =>
      getFeedbacks().then((res) => setFeedbacks(res.data))
    );
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage feedbacks={feedbacks} onDelete={handleDeleteFeedback} />
          }
        />
        <Route
          path="/add-feedback"
          element={<AddFeedbackPage onAdd={handleAddFeedback} />}
        />
        <Route
          path="/edit-feedback/:id"
          element={
            <EditFeedbackPage feedbacks={feedbacks} onEdit={handleEditFeedback} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
