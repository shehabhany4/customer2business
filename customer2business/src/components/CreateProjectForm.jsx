import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useProjects } from "../context/ProjectsContext.jsx";
import useToast from "../hooks/useToast.jsx";

export default function CreateProjectForm() {
  const { currentUser } = useAuth();
  const { createProject } = useProjects();
  const { addToast, ToastContainer } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("Web Development");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      addToast("Please fill in all fields", "danger");
      return;
    }

    createProject({ title, description, budget, category, companyId: currentUser.id });
    addToast("Project created successfully!", "success");

    // Reset form
    setTitle("");
    setDescription("");
    setBudget("");
    setCategory("Web Development");
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <ToastContainer />
        <h5 className="card-title">Create New Project</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Budget ($)</label>
            <input type="number" className="form-control" value={budget} onChange={(e) => setBudget(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Design</option>
              <option>Writing</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Create Project</button>
        </form>
      </div>
    </div>
  );
}
