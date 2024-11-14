import ProjectsGallery from "@/components/projects-gallery";
import { Suspense } from "react";
import ProjectsLoading from "./loading";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-carbon mb-8 md:mb-12">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-graphite">
            Explore my portfolio of web development projects, featuring modern
            technologies and creative solutions.
          </p>
        </div>
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsGallery />
        </Suspense>
      </section>
    </div>
  );
}
