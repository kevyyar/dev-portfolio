interface DeleteProjectModalProps {
  project: {
    id: string;
    title: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteProjectModal = ({
  project,
  onClose,
  onSuccess,
}: DeleteProjectModalProps) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Delete Project</h2>
        <p className="mb-6">
          Are you sure you want to delete &quot;{project.title}&quot;? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
