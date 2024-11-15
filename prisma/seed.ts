import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: "Real Estate",
        slug: "real-estate",
        description:
          "A modern real estate platform built with PHP and React, designed to streamline property searching and listing management. The application features an intuitive user interface, advanced search capabilities, and a robust admin dashboard for property management.",
        image: "/assets/real-estate.png",
        technologies: ["React", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
        githubUrl: "https://github.com/yourusername/real-estate",
        liveUrl: "https://real-estate-demo.com",
      },
    }),
    prisma.project.create({
      data: {
        title: "E-commerce Dashboard",
        slug: "ecommerce-dashboard",
        description:
          "A comprehensive dashboard for managing online store inventory, orders, and customer data.",
        // image: "/images/dashboard.png",
        image: "/assets/e-commerce.png",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Redux"],
        githubUrl: "https://github.com/yourusername/ecommerce-dashboard",
        liveUrl: "https://ecommerce-dashboard-demo.com",
      },
    }),
    prisma.project.create({
      data: {
        title: "Weather App",
        slug: "weather-app",
        description:
          "Real-time weather application with location-based forecasts and interactive maps.",
        image: "/assets/weather.png",
        // image: "/images/weather.png",
        technologies: [
          "React Native",
          "TypeScript",
          "Weather API",
          "Geolocation",
        ],
        githubUrl: "https://github.com/yourusername/weather-app",
        liveUrl: "https://weather-app-demo.com",
      },
    }),
    prisma.project.create({
      data: {
        title: "Note Taking AI",
        slug: "ai-note-taking",
        description: "Take notes while the AI helps you manage your mood",
        image: "/assets/note-taking.png",
        // image: "/images/weather.png",
        technologies: ["NextJS", "TailwindCSS", "OpenAI Api", "Prisma"],
        githubUrl: "https://github.com/yourusername/ai-note-taking",
        liveUrl: "https://ai-note-taking-demo.com",
      },
    }),
  ]);

  console.log("Seeds planted! 🌱");
  console.log(projects);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
