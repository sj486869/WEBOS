"use client";

import { useState, useEffect } from "react";
import { useAuthStore, User } from "@/store/authStore";
import { Users, UserPlus, ShieldAlert, Edit, Trash2, Shield, UserCircle, Save, X } from "lucide-react";
import type { AppComponentProps } from "@/core/os/appRegistry";

export function UsersApp({}: AppComponentProps) {
  const { currentUser, users, addUser, updateUser, deleteUser } = useAuthStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  // Only admin can access this app
  if (!isHydrated) return null;

  if (currentUser?.role !== "admin") {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-950 text-white p-6">
        <ShieldAlert className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-light mb-2 tracking-wide text-red-400">Access Denied</h1>
        <p className="text-gray-400 text-center max-w-sm">
          You must have Administrator privileges to access the User Management panel. 
          Please contact Suman Jana for access.
        </p>
      </div>
    );
  }

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRole("user");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!username.trim()) {
      alert("Username is required");
      return;
    }

    if (editingId) {
      updateUser(editingId, { username, password, role });
    } else {
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert("A user with this name already exists");
        return;
      }
      addUser({ username, password, role });
    }
    resetForm();
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setUsername(user.username);
    setPassword(user.password || "");
    setRole(user.role);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      deleteUser(id);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#333] bg-[#252526] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-white">User Management</h1>
            <p className="text-xs text-gray-400">Admin Control Panel</p>
          </div>
        </div>
        <button
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* Form Modal (Overlay) */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-[#333] bg-[#252526] p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {editingId ? "Edit User" : "Add New User"}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-400">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded border border-[#444] bg-[#1e1e1e] p-2 text-white outline-none focus:border-blue-500"
                    placeholder="e.g. Suman Jana"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-400">Password</label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border border-[#444] bg-[#1e1e1e] p-2 text-white outline-none focus:border-blue-500"
                    placeholder="Leave blank for no password"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-400">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as "admin" | "user")}
                    className="w-full rounded border border-[#444] bg-[#1e1e1e] p-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="user">User (Standard Access)</option>
                    <option value="admin">Admin (Full Control)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={resetForm}
                  className="rounded px-4 py-2 text-sm font-medium hover:bg-[#333]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  Save User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#333] bg-[#252526] p-5 shadow-sm transition hover:border-[#444] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e1e] border border-[#333]">
                    <UserCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{user.username}</h3>
                    <div className="mt-1 flex items-center gap-1">
                      {user.role === "admin" ? (
                        <span className="flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="rounded bg-gray-500/10 px-2 py-0.5 text-xs font-medium text-gray-400">
                          User
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#333] pt-4">
                <div className="text-xs text-gray-500">
                  {user.password ? "Password protected" : "No password"}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(user)}
                    className="flex h-8 w-8 items-center justify-center rounded bg-[#1e1e1e] hover:bg-blue-600 hover:text-white text-gray-400 transition"
                    title="Edit user"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex h-8 w-8 items-center justify-center rounded bg-[#1e1e1e] hover:bg-red-600 hover:text-white text-gray-400 transition"
                    title="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
