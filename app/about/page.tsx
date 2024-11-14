import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-carbon mb-8 md:mb-12">
          About Me
        </h1>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="https://picsum.photos/seed/portrait/800/800"
              alt="Portrait photo"
              fill
              className="object-cover"
              priority={true}
              quality={90}
            />
          </div>

          <div className="space-y-6">
            <p className="text-lg md:text-xl lg:text-2xl text-graphite leading-relaxed mb-4">
              Hi there! I&apos;m a passionate Front-End Developer with a keen
              eye for creating engaging and intuitive user experiences. I
              specialize in building responsive web applications using modern
              technologies like React, Next.js, and TypeScript.
            </p>

            <p className="text-lg md:text-xl lg:text-2xl text-graphite leading-relaxed">
              My approach to development combines clean, efficient code with
              pixel-perfect design implementation. I&apos;m particularly
              enthusiastic about component-based architecture and modern web
              development practices.
            </p>

            <div className="pt-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-carbon mb-4">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "JavaScript",
                  "HTML5",
                  "CSS3",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-dune text-carbon rounded-full text-sm md:text-base"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
