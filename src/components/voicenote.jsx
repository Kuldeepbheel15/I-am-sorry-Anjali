"use client"

import { useState, useRef } from "react"
import { motion } from "motion/react"
import { Play, Pause, Volume2, VolumeX, MessageSquareText } from "lucide-react" // Added MessageSquareText for icon

export default function VoiceNote() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.log("Voice note play prevented:", error)
          // Handle cases where play() might be blocked (e.g., not user-initiated)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteUnmute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Reset state when audio ends
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8"
    >
      <div className="w-full max-w-md">
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
              <MessageSquareText className="w-16 h-16 text-purple-400 mx-auto drop-shadow-lg" />
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                My Voice,My feelings 
              </h2>

              <motion.p
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-base md:text-lg text-purple-200 leading-relaxed"
              >
                Click the button below to hear a special message.
              </motion.p>
            </div>

            <audio ref={audioRef} onEnded={handleAudioEnded}>
              {/* Replace with the actual path to your voice note file */}
              <source src="/audio/voicenote.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" /> Play Voice Note
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMuteUnmute}
                className="bg-white/10 text-white px-4 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex items-center justify-center"
              >
                <span className="relative z-10">
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
