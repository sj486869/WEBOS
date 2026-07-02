"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User as UserIcon, ArrowRight, Loader2, Key, Eye, EyeOff } from "lucide-react";
import { useOSStore } from "@/store/osStore";
import { useAuthStore, User } from "@/store/authStore";

export function LoginScreen() {
  const { wallpaper } = useOSStore();
  const { users, login } = useAuthStore();
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (selectedUser.password && !password) {
      setError("Password cannot be empty");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate authentication delay for UX
    setTimeout(() => {
      const success = login(selectedUser.username, password);
      if (!success) {
        setError("Incorrect password");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ background: wallpaper }}
    >
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center"
      >
        {!selectedUser ? (
          <div className="flex flex-col items-center w-full">
            <h1 className="mb-8 text-4xl font-light text-white tracking-widest drop-shadow-md">
              Welcome
            </h1>
            <p className="text-white/60 mb-6 font-medium tracking-wide">SELECT A USER</p>
            
            <div className="flex gap-6 flex-wrap justify-center max-w-lg w-full px-4">
              {users.map((u) => (
                <motion.div
                  key={u.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUser(u)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 shadow-xl backdrop-blur-xl group-hover:border-white/50 transition-colors duration-300">
                    <UserIcon size={40} className="text-white/80 group-hover:text-white transition-colors" />
                  </div>
                  <span className="mt-4 text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                    {u.username}
                  </span>
                  {u.role === 'admin' && (
                    <span className="mt-1 text-[10px] uppercase tracking-widest text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded-full">Admin</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            {/* Avatar */}
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl cursor-pointer hover:border-white/40 transition-colors"
              onClick={() => { setSelectedUser(null); setPassword(""); setError(null); }}
              title="Click to switch user"
            >
              <UserIcon size={64} className="text-white/80" />
            </motion.div>

            {/* Username */}
            <h1 className="mb-8 text-3xl font-light text-white tracking-wider flex flex-col items-center">
              {selectedUser.username}
              <span className="text-xs text-white/50 mt-2 cursor-pointer hover:text-white/80 transition-colors" onClick={() => setSelectedUser(null)}>
                Switch User
              </span>
            </h1>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full">
              {selectedUser.password ? (
                <div className="relative group">
                  <div className={`flex items-center overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-xl transition-all duration-300 focus-within:border-white/50 focus-within:bg-black/50 ${error ? 'border-red-500/50 focus-within:border-red-500/80 bg-red-950/20' : ''}`}>
                    <div className="flex h-12 w-12 items-center justify-center text-white/50 group-focus-within:text-white/90 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(null);
                      }}
                      disabled={loading}
                      className="h-12 flex-1 bg-transparent px-2 text-white placeholder-white/40 outline-none transition-all disabled:opacity-50"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex h-12 w-10 items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      type="submit"
                      disabled={!password || loading}
                      className={`flex h-12 w-14 items-center justify-center transition-all ${
                        password ? "bg-white/20 hover:bg-white/30 text-white" : "text-white/30"
                      }`}
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ArrowRight size={18} />
                      )}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-8 left-0 w-full text-center text-sm font-medium text-red-400 drop-shadow-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-xl"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : 'Log In'}
                </button>
              )}
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
