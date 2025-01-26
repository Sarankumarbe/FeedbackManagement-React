import { Link } from "react-router-dom"; // Import Link for navigation
import FeedbackList from "../components/FeedbackList";

const HomePage = ({ feedbacks, onDelete }) => {
  return (
    <div className="bg-dark text-light min-vh-100 p-4 position-relative">
      <h1 className="mb-4">Feedbacks</h1>
      <FeedbackList feedbacks={feedbacks} onDelete={onDelete} />

      {/* Floating Add Feedback Button */}
      <Link
        to="/add-feedback" // The path to the Add Feedback screen
        className="btn btn-danger position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center"
        style={{
          borderRadius: "30px",
          padding: "12px 20px",
          width: "auto",
          minWidth: "160px",
        }}
      >
        <span className="fs-4 me-2">+</span> {/* "+" symbol */}
        <span className="fs-6">Add Feedback</span> {/* Text */}
      </Link>
    </div>
  );
};

export default HomePage;
