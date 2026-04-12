"use client";

import { motion } from "framer-motion";

export default function PolarisPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans">
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-[#3B4FBF] to-amber-400 bg-clip-text text-transparent">
              Polaris
            </span>
          </h1>
          <p className="text-gray-600 text-lg">The unified TaaS web engine</p>
        </div>

        <motion.div
          className="w-full max-w-md p-8 border-2 border-[#3B4FBF] rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Authentication
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] transition"
              />
            </div>

            <button className="w-full py-2 bg-gradient-to-r from-[#3B4FBF] to-amber-400 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <span className="text-[#3B4FBF] font-semibold cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </motion.div>

        <motion.p
          className="text-gray-500 text-sm mt-8 text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          This is a placeholder authentication page. Custom design coming soon.
        </motion.p>
      </motion.div>
    </div>
  );
}
