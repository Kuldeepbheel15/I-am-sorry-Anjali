"use client"

import { useEffect, useRef } from "react"
import { motion } from "motion/react"

export default function BackgroundMusic() {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      // Attempt to play the audio. Browsers might block autoplay without user interaction.
      // It's good practice to handle the promise returned by play()
      audioRef.current.play().catch(error => {
        console.log("Autoplay of background music prevented:", error)
        // You might want to show a message to the user to click to enable music
      })
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50" // Position the music player discreetly
    >
      <audio ref={audioRef} loop>
        {/* Replace with the actual path to your background music file */}
        <source src="/audio/bgmusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {/* You can add a visual indicator or controls here if needed */}
      <p className="text-white/50 text-xs">Background Music Playing (if allowed by browser)</p>
    </motion.div>
  )
}
