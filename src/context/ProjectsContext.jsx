import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./useLocalStorage.js";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useLocalStorage("projects", []);

  // Create Project
  const createProject = ({ title, description, budget, category, companyId }) => {
    const newProject = {
      id: uuid(),
      title,
      description,
      budget: Number(budget),
      category,
      status: "open",
      companyId,
      createdAt: new Date().toISOString(),
      proposals: [],
    };
    setProjects([newProject, ...projects]);
  };

  // Delete Project
  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Update Project Status
  const updateStatus = (id, status) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  // Add Proposal
  const addProposal = ({ projectId, freelancerId, message, price }) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              proposals: [
                ...p.proposals,
                {
                  id: uuid(),
                  freelancerId,
                  message,
                  price: Number(price),
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : p
      )
    );
  };

  return (
    <ProjectsContext.Provider value={{ projects, createProject, deleteProject, updateStatus, addProposal }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
