"use client";

import { useEffect, useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import EditProjectModal from "./EditProjectModal";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

const ProjectDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleDelete = (project: Project) => {
    setDeletingProject(project);
  };

  const handleUpdateSuccess = () => {
    setEditingProject(null);
    fetchProjects();
  };

  const handleDeleteSuccess = () => {
    setDeletingProject(null);
    fetchProjects();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-whisper">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-6" />
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-whisper">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-carbon">
          Project Dashboard
        </h1>
        <div className="overflow-x-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden min-w-[800px]">
            <table className="w-full">
              <thead className="bg-carbon text-whisper">
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Slug</th>
                  <th className="px-6 py-3 text-left">Technologies</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="px-6 py-4">{project.title}</td>
                    <td className="px-6 py-4">{project.slug}</td>
                    <td className="px-6 py-4">
                      {project.technologies.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {deletingProject && (
        <DeleteProjectModal
          project={deletingProject}
          onClose={() => setDeletingProject(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default ProjectDashboard;
