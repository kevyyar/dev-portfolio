import db from "@/utils/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RxGithubLogo, RxGlobe } from "react-icons/rx";

type Params = Promise<{ project: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { project } = await params;
  const projectData = await getProject(project);
  return {
    title: projectData?.title || "Project Not Found",
    description: projectData?.description || "Project Description Not Found",
  };
}

async function getProject(slug: string) {
  const project = await db.project.findUnique({
    where: {
      slug: slug,
    },
  });
  return project;
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { project } = await params;
  const projectData = await getProject(project);

  if (!projectData) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Project Details */}
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-carbon">
              {projectData.title}
            </h1>

            <div className="space-y-4">
              <p className="text-lg text-graphite leading-relaxed">
                {projectData.description}
              </p>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-carbon">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {projectData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dune text-carbon rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-carbon">
                  Project Links
                </h2>
                <div className="flex gap-4">
                  <Link
                    href={projectData.githubUrl || ""}
                    className="flex items-center gap-2 px-4 py-2 bg-carbon text-whisper rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <RxGithubLogo className="text-xl" />
                    <span>View Code</span>
                  </Link>
                  <Link
                    href={projectData.liveUrl || ""}
                    className="flex items-center gap-2 px-4 py-2 bg-carbon text-whisper rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <RxGlobe className="text-xl" />
                    <span>Live Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Project Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={projectData.image}
              alt={projectData.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
