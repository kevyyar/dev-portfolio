import db from "@/utils/db";
import Project from "./project";

const getProjects = async () => {
  const projects = await db.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return projects;
};

const ProjectsGallery = async () => {
  const projects = await getProjects();

  return (
    <div className="grid gap-8 place-items-center md:grid-cols-3 lg:grid-cols-4">
      {projects.map((project) => (
        <Project key={project.id} projects={project} />
      ))}
    </div>
  );
};

export default ProjectsGallery;
