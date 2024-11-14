import ProjectsLoading from "@/app/projects/loading";
import db from "@/utils/db";
import { Suspense } from "react";
import Project from "./project";

const getProjects = async () => {
  const projects = await db.project.findMany({});
  return projects;
};

const ProjectsList = async () => {
  const projects = await getProjects();

  return (
    <section className="my-20">
      <div className="grid gap-8 place-items-center md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <Project key={project.id} projects={project} />
        ))}
      </div>
    </section>
  );
};

const Projects = async () => {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsList />
    </Suspense>
  );
};

export default Projects;
