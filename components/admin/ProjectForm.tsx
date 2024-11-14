"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

const ProjectForm = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState<ProjectFormData>({
    title: "",
    slug: "",
    description: "",
    image: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset any previous errors
      setUploadError("");

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file");
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image");
      }

      const data = await response.json();
      return data.filename;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload image: " + (error as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError("");

    try {
      let imageUrl = projectData.image;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...projectData,
          image: imageUrl,
          technologies: projectData.technologies
            .split(",")
            .map((tech) => tech.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      // Clear form
      setProjectData({
        title: "",
        slug: "",
        description: "",
        image: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
      });
      setSelectedImage(null);
      setPreviewUrl("");

      router.refresh();
      alert("Project created successfully!");
    } catch (error) {
      setUploadError((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-carbon">
        Create New Project
      </h1>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
            placeholder="Project Title"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={projectData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
            placeholder="project-slug"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
            placeholder="Project description..."
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Project Image
          </label>
          <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
            {previewUrl && (
              <div className="relative w-full aspect-video mb-4">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-carbon file:text-whisper hover:file:bg-opacity-90"
            />
            {uploadError && (
              <p className="mt-2 text-sm text-red-600">{uploadError}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="githubUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GitHub URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={projectData.githubUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
            placeholder="https://github.com/yourusername/project"
          />
        </div>
        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Live URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            value={projectData.liveUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label
            htmlFor="technologies"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Technologies
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={projectData.technologies}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
            placeholder="React, TypeScript, TailwindCSS (comma-separated)"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-carbon text-whisper py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 mt-6 disabled:opacity-50"
        >
          {isUploading ? "Creating Project..." : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
