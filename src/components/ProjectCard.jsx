import { useState } from "react";
import { useProjects } from "../context/ProjectsContext.jsx";
import ProposalModal from "./ProposalModal.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import useToast from "../hooks/useToast.jsx";

export default function ProjectCard({ project }) {
  const { deleteProject, updateStatus } = useProjects();
  const { addToast, ToastContainer } = useToast();

  const [showProposals, setShowProposals] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteProject(project.id);
    addToast("Project deleted successfully!", "success");
    setShowConfirm(false);
  };

  return (
    <>
      <ToastContainer />

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
          <p className="mb-1"><strong>Category:</strong> {project.category}</p>
          <p className="mb-1"><strong>Budget:</strong> ${project.budget}</p>
          <p className="mb-1"><strong>Status:</strong> {project.status}</p>

          <select
            className="form-select mb-2"
            value={project.status}
            onChange={(e) => updateStatus(project.id, e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button className="btn btn-primary btn-sm me-2" onClick={() => setShowProposals(true)}>
            View Proposals ({project.proposals.length})
          </button>

          <button className="btn btn-danger btn-sm" onClick={() => setShowConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      {/* Proposals Modal */}
      {showProposals && <ProposalModal project={project} onClose={() => setShowProposals(false)} />}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirm}
        message="Are you sure you want to delete this project?"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
