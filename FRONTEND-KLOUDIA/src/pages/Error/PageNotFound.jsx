/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
export function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white px-6">
      <motion.h1
        className="text-8xl font-extrabold"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Halaman Tidak Ditemukan
      </motion.h2>

      <motion.p
        className="mt-4 text-gray-300 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Sepertinya halaman yang kamu cari tidak ada atau telah dipindahkan. Yuk
        balik ke beranda!
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-100 transition"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
