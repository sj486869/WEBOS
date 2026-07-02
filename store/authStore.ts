"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { api } from "@/utils/api";

export type Role = "admin" | "user";

export interface User {
  id: string;
  username: string;
  password?: string;
  role: Role;
  avatarUrl?: string;
  createdAt: number;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
}

interface AuthActions {
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  resetAuth: () => void;
  initAuth: () => Promise<void>;
}

const DEFAULT_USERS: User[] = [
  {
    id: "admin-1",
    username: "suman jana",
    password: "2026",
    role: "admin",
    createdAt: Date.now(),
  },
  {
    id: "guest-1",
    username: "Guest",
    password: "", // No password required for guest
    role: "user",
    createdAt: Date.now(),
  }
];

const INITIAL_STATE: AuthState = {
  users: DEFAULT_USERS,
  currentUser: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      initAuth: async () => {
        try {
          const dbUsers = await api.users.list();
          if (dbUsers && dbUsers.length > 0) {
            set({ users: dbUsers as User[] });
          } else {
            for (const u of DEFAULT_USERS) {
              await api.users.save(u);
            }
            set({ users: DEFAULT_USERS });
          }
        } catch (err: any) {
          console.error("Failed to init auth from Supabase:", err?.message || err);
        }
      },

      login: (username: string, password?: string) => {
        const { users } = get();
        const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
        
        if (!user) return false;
        
        // If password is required and doesn't match
        if (user.password && user.password !== password) {
          return false;
        }

        set({ currentUser: user });
        return true;
      },

      logout: () => {
        set({ currentUser: null });
      },

      addUser: (user) => {
        const newUser = {
          ...user,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: Date.now(),
        };
        api.users.save(newUser).catch(console.error);
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },

      updateUser: (id, updates) => {
        set((state) => {
          const newUsers = state.users.map((u) => (u.id === id ? { ...u, ...updates } : u));
          const updatedUser = newUsers.find(u => u.id === id);
          if (updatedUser) api.users.save(updatedUser).catch(console.error);
          
          const newCurrentUser = state.currentUser?.id === id ? { ...state.currentUser, ...updates } : state.currentUser;
          return { users: newUsers, currentUser: newCurrentUser };
        });
      },

      deleteUser: (id) => {
        api.users.delete(id).catch(console.error);
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
          currentUser: state.currentUser?.id === id ? null : state.currentUser,
        }));
      },

      resetAuth: () => {
        set({ ...INITIAL_STATE });
      },
    }),
    {
      name: "web-os:auth",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
