import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import ProjectDashboard from "./ProjectDashboard";
import ProjectForm from "./ProjectForm";

interface AdminTabsProps {
  defaultTab?: "create" | "dashboard";
}

const AdminTabs = ({ defaultTab = "create" }: AdminTabsProps) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"create" | "dashboard">(
    defaultTab
  );

  const handleTabChange = (tab: "create" | "dashboard") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen p-8 bg-whisper">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabChange("create")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === "create"
                  ? "bg-carbon text-whisper"
                  : "bg-gray-200 text-carbon hover:bg-gray-300"
              }`}
            >
              Create Project
            </button>
            <button
              onClick={() => handleTabChange("dashboard")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === "dashboard"
                  ? "bg-carbon text-whisper"
                  : "bg-gray-200 text-carbon hover:bg-gray-300"
              }`}
            >
              Project Dashboard
            </button>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {activeTab === "create" && <ProjectForm />}
        {activeTab === "dashboard" && <ProjectDashboard />}
      </div>
    </div>
  );
};

export default AdminTabs;
