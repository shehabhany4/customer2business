import { useState } from "react";
import { useProjects } from "../context/ProjectsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import ProjectCardFreelancer from "./ProjectCardFreelancer.jsx";
import usePagination from "../hooks/usePagination.js";
import Navbar from "./Navbar.jsx";

export default function FreelancerDashboard() {
  const { projects } = useProjects();
  const { currentUser } = useAuth();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  // Projects open for freelancers
  let filteredProjects = projects.filter(p => p.status === "open");

  // Apply Filters
  if (search) filteredProjects = filteredProjects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  if (categoryFilter) filteredProjects = filteredProjects.filter(p => p.category === categoryFilter);
  if (statusFilter) filteredProjects = filteredProjects.filter(p => p.status === statusFilter);
  if (budgetMin) filteredProjects = filteredProjects.filter(p => p.budget >= Number(budgetMin));
  if (budgetMax) filteredProjects = filteredProjects.filter(p => p.budget <= Number(budgetMax));

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
    setBudgetMin("");
    setBudgetMax("");
  };

  // Pagination
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(filteredProjects, 6);

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>Freelancer Dashboard</h2>

      {/* Filters */}
      <div className="card mb-4 p-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="col-md-2">
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Design</option>
              <option>Writing</option>
            </select>
          </div>

          <div className="col-md-2">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Min Budget" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} />
          </div>

          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Max Budget" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} />
          </div>

          <div className="col-md-1">
            <button className="btn btn-secondary w-100" onClick={resetFilters}>Reset</button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      {currentItems.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        currentItems.map(project => (
          <ProjectCardFreelancer key={project.id} project={project} freelancerId={currentUser.id} />
        ))
      )}

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
            </li>

            {[...Array(totalPages)].map((_, idx) => (
              <li key={idx} className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => goToPage(idx + 1)}>{idx + 1}</button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
    </>
    
  );
}
