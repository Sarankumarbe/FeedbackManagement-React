import FeedbackItem from "./FeedbackItem";

const FeedbackList = ({ feedbacks = [], onDelete }) => {
  // Fallback check if feedbacks is not an array
  if (!Array.isArray(feedbacks)) {
    console.error("FeedbackList expects feedbacks to be an array:", feedbacks);
    return <div className="text-center">No feedbacks available.</div>;
  }

  return (
    <div className="row g-3">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="col-12 col-md-6">
          <FeedbackItem feedback={feedback} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
