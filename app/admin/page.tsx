"use client";

import AdminTabs from "@/components/admin/AdminTabs";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      login();
    }
    setIsLoading(false);
  }, [login]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      login();
    } else {
      alert("Invalid credentials");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RxReload className="w-10 h-10 animate-spin text-carbon" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-whisper">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-96"
        >
          <h1 className="text-2xl font-bold mb-6 text-carbon">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-carbon mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-carbon mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-carbon text-whisper py-2 rounded-md hover:bg-opacity-90"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <AdminTabs />
    </ProtectedRoute>
  );
};

export default AdminPage;
