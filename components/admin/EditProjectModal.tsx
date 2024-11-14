"use client";

import Image from "next/image";
import { useState } from "react";

interface EditProjectModalProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const EditProjectModal = ({
  project,
  onClose,
  onSuccess,
}: EditProjectModalProps) => {
  const [formData, setFormData] = useState({
    title: project.title,
    slug: project.slug,
    description: project.description,
    image: project.image,
    technologies: project.technologies.join(", "),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(project.image);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadError("");

      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file");
        return;
      }

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
      let imageUrl = formData.image;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          technologies: formData.technologies
            .split(",")
            .map((tech) => tech.trim()),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      onSuccess();
    } catch (error) {
      setUploadError((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-1">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-carbon mb-1">
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

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-1">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
              placeholder="React, TypeScript, Tailwind CSS"
              required
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-1">
              Live URL
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) =>
                setFormData({ ...formData, liveUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
              placeholder="https://your-project.com"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-carbon text-whisper rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {isUploading ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
