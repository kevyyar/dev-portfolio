import { toCapitalize } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  projects: {
    id: string;
    createdAt: Date;
    slug: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
  };
}

const Project = ({ projects }: ProjectProps) => {
  return (
    <Link
      href={`/projects/${projects.slug}`}
      className="group w-full sm:w-[calc(80%-8px)] md:w-[calc(100%-10px)] lg:w-[calc(90%-12px)] aspect-square relative rounded-xl overflow-hidden border border-carbon cursor-pointer"
    >
      <div className="relative w-full h-full">
        <Image
          alt={projects.description}
          src={projects.image}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          quality={90}
        />
      </div>

      <div className="absolute top-4 left-4 px-3 py-1 bg-carbon/80 backdrop-blur-sm rounded-full text-xs text-whisper md:text-sm">
        {projects.title}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-medium text-whisper mb-2">
            {toCapitalize(projects.title)}
          </h3>
          <p className="text-sm text-whisper/80">
            {toCapitalize(projects.description)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Project;
