"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useOSStore } from "@/store/osStore";

export function LoginScreen() {
  const { wallpaper, username, setLoggedIn } = useOSStore();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    
    if (password !== "2026") {
      setError("Incorrect password");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate authentication delay
    setTimeout(() => {
      setLoggedIn(true);
    }, 1200);
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
        className="relative z-10 flex w-full max-w-sm flex-col items-center"
      >
        {/* Avatar */}
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl"
        >
          <User size={64} className="text-white/80" />
        </motion.div>

        {/* Username */}
        <h1 className="mb-8 text-3xl font-light text-white tracking-wider">
          {username}
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full">
          <div className="relative group">
            <div className={`flex items-center overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-xl transition-all duration-300 focus-within:border-white/50 focus-within:bg-black/50 ${error ? 'border-red-500/50 focus-within:border-red-500/80 bg-red-950/20' : ''}`}>
              <div className="flex h-12 w-12 items-center justify-center text-white/50 group-focus-within:text-white/90 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
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
                type="submit"
                disabled={!password || loading}
                className="flex h-12 w-12 items-center justify-center text-white/50 hover:text-white disabled:opacity-30 transition-all"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <ArrowRight size={20} className={password ? "text-white" : ""} />
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-7 w-full text-center text-sm text-red-400 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col items-center text-white/40"
        >
          <p className="text-sm">Web OS Desktop</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
