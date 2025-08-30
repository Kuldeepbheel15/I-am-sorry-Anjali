"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Lock, Heart, Sparkles } from "lucide-react"

export default function SecretCode({ onUnlock }) {
  const [code, setCode] = useState("")
  const [isWrong, setIsWrong] = useState(false)
  const secretCode = "143"

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code === secretCode) {
      onUnlock()
    } else {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 2500)
      setCode("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8"
    >

      <div className="w-full max-w-md">
        <motion.div
          animate={{
            rotate: isWrong ? [0, -5, 5, -5, 5, 0] : 0,
            scale: isWrong ? [1, 0.95, 1.05, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-6">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Lock className="w-16 h-16 text-pink-400 mx-auto drop-shadow-lg" />

                {/* Subtle sparkles around lock */}
                {[...Array(4)].map((_, i) => (
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
                      delay: i * 0.5,
                    }}
                    className="absolute"
                    style={{
                      left: `${50 + 30 * Math.cos((i * 90 * Math.PI) / 180)}%`,
                      top: `${50 + 30 * Math.sin((i * 90 * Math.PI) / 180)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                ))}
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Sorry Code
                </h2>
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-pink-200 text-lg"
                >
                  Enter the code for Anjali 💔
                </motion.p>
                <p className="text-white/50 text-sm"><span className="text-black/80">💡</span>Hint: Three numbers that mean "I Love You"</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full px-6 py-4 bg-white/5 border-2 rounded-2xl text-center text-3xl font-semibold tracking-[0.5em] focus:outline-none focus:ring-4 transition-all ${
                  isWrong
                    ? "border-red-400/50 focus:ring-red-400/20 text-red-300"
                    : "border-white/20 focus:ring-pink-400/20 focus:border-pink-400/50 text-white"
                }`}
                placeholder="❤❤❤"
                maxLength={3}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  Unlock This Anjali 
                  <Heart className="w-5 h-5 fill-current" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </form>

            {isWrong && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-sm bg-red-500/10 rounded-full px-4 py-2 border border-red-400/20"
              >
                💕Try again, My Anjali! Think of our special number
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
