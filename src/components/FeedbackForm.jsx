import { useState } from "react";

const FeedbackForm = ({ initialData = {}, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    platform: initialData.platform || "",
    module: initialData.module || "",
    description: initialData.description || "",
    attachment: null, // for PNG file picker
    tags: initialData.tags || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submit triggered");

    if (isSubmitting) {
      console.log("Form is already submitting, preventing double submission");
      return; // Prevent multiple submissions
    }

    setIsSubmitting(true); // Disable further submissions

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("platform", form.platform);
    formData.append("module", form.module);
    formData.append("description", form.description);
    formData.append("tags", form.tags);

    if (form.attachment) {
      formData.append("attachment", form.attachment);
    }

    console.log("Submitting form data:", formData);

    try {
      await onSubmit(formData); // Handle submission
    } catch (error) {
      console.error("Error during form submission:", error);
    }

    setIsSubmitting(false); // Reset after submission is complete
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark text-light p-4 rounded shadow-lg"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label text-light">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control bg-dark text-light border-secondary"
          placeholder="Enter title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="platform" className="form-label text-light">
          Platform
        </label>
        <select
          id="platform"
          name="platform"
          value={form.platform}
          onChange={handleChange}
          className="form-select bg-dark text-light border-secondary"
        >
          <option value="">Select Platform</option>
          <option value="Android">Android</option>
          <option value="iOS">iOS</option>
          <option value="Web">Web</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="module" className="form-label text-light">
          Module
        </label>
        <select
          id="module"
          name="module"
          value={form.module}
          onChange={handleChange}
          className="form-select bg-dark text-light border-secondary"
        >
          <option value="">Select Module</option>
          <option value="Channel">Channel</option>
          <option value="Project">Project</option>
          <option value="Task">Task</option>
          <option value="Chat">Chat</option>
          <option value="Alert">Alert</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label text-light">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control bg-dark text-light border-secondary"
          rows="4"
          placeholder="Enter description"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="attachment" className="form-label text-light">
          Attachment
        </label>
        <input
          type="file"
          id="attachment"
          name="attachment"
          accept=".png"
          onChange={handleChange}
          className="form-control bg-dark text-light border-secondary"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label text-light">
          Tags
        </label>
        <select
          id="tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="form-select bg-dark text-light border-secondary"
        >
          <option value="">Select Tag</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feedback">Feedback</option>
          <option value="Idea">Idea</option>
          <option value="Feature Request">Feature Request</option>
        </select>
      </div>

      <div className="d-flex justify-content-end gap-3">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
