"use client"

import { motion } from "motion/react"
import { Heart, Sparkles } from "lucide-react"

export default function ConfessionIntro({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Heart className="w-16 h-16 text-pink-400 fill-current mx-auto" />

              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                  className="absolute"
                  style={{
                    left: `${50 + 35 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                    top: `${50 + 35 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </motion.div>
              ))}
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                I’ve been hiding something sweet...
              </h2>

              <motion.p
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-base md:text-lg text-pink-200 leading-relaxed"
              >
                There’s a little secret I’ve been saving for the right moment for you Anjali.
                Want to know what it is? 💖
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 md:px-12 py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-5 h-5 fill-current" />
                Show me KULDEEP
                <Heart className="w-5 h-5 fill-current" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
