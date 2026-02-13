import Navbar from "./Navbar.jsx";
import CreateProjectForm from "./CreateProjectForm.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { useProjects } from "../context/ProjectsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function CompanyDashboard() {
  const { projects } = useProjects();
  const { currentUser } = useAuth();

  // Projects of this company only
  const myProjects = projects.filter(p => p.companyId === currentUser.id);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Company Dashboard</h2>
        <CreateProjectForm />

        {myProjects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          myProjects.map(project => <ProjectCard key={project.id} project={project} />)
        )}
      </div>
    </div>
  );
}
