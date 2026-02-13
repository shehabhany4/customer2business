import { useAuth } from "../context/AuthContext.jsx";

export default function ProposalModal({ project, onClose }) {
  const { users } = useAuth();

  const getFreelancerName = (id) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : "Unknown";
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Proposals for {project.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {project.proposals.length === 0 ? (
              <p>No proposals yet.</p>
            ) : (
              project.proposals.map(proposal => (
                <div key={proposal.id} className="card mb-2">
                  <div className="card-body">
                    <p><strong>Freelancer:</strong> {getFreelancerName(proposal.freelancerId)}</p>
                    <p><strong>Message:</strong> {proposal.message}</p>
                    <p><strong>Price:</strong> ${proposal.price}</p>
                    <p><small>Submitted at: {new Date(proposal.createdAt).toLocaleString()}</small></p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
