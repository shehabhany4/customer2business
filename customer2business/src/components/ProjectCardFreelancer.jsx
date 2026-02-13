import { useState } from "react";
import { useProjects } from "../context/ProjectsContext.jsx";
import useToast from "../hooks/useToast.jsx";

export default function ProjectCardFreelancer({ project, freelancerId }) {
  const { addProposal } = useProjects();
  const { addToast, ToastContainer } = useToast();

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(project.proposals.some(p => p.freelancerId === freelancerId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !price) {
      addToast("Please fill all fields", "danger");
      return;
    }
    if (submitted) {
      addToast("You already applied to this project", "warning");
      return;
    }

    addProposal({ projectId: project.id, freelancerId, message, price });
    addToast("Proposal submitted successfully!", "success");
    setSubmitted(true);
  };

  return (
    <div className="card mb-3">
      <ToastContainer />
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <p><strong>Category:</strong> {project.category}</p>
        <p><strong>Budget:</strong> ${project.budget}</p>

        {submitted ? (
          <p className="text-success">You already applied to this project.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Proposal Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Your Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Apply</button>
          </form>
        )}
      </div>
    </div>
  );
}
