"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Loader from "@/components/Loader"
import SecretCode from "@/components/SecretCode"
import HeartReveal from "@/components/HeartReveal"
import ConfessionIntro from "@/components/ConfessionIntro"
import SpecialMessage from "@/components/SpecialMessage"
import PhotoGallery from "@/components/PhotoGallery"

export default function ConfessionSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950/35 via-black/40 to-fuchsia-950/35 relative overflow-hidden">

      <div className="fixed inset-0 z-0 blur-xl opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 25% 30%, rgba(236,72,153,0.7), transparent 40%)",
      }} />

      <div className="fixed inset-0 z-0 blur-xl opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 75% 75%, rgba(99,102,241,0.7), transparent 40%)",
      }} />

      <div className="fixed inset-0 z-0 blur-2xl opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(228,193,255,0.6), transparent 40%)",
      }} />


      <AnimatePresence mode="wait">
        {currentScreen === "loader" && <Loader key="loader" onComplete={() => handleScreenChange("secretCode")} />}
        {currentScreen === "secretCode" && (
          <SecretCode key="secretCode" onUnlock={() => handleScreenChange("heartReveal")} />
        )}
        {currentScreen === "heartReveal" && (
          <HeartReveal key="heartReveal" onComplete={() => handleScreenChange("confessionIntro")} />
        )}
        {currentScreen === "confessionIntro" && (
          <ConfessionIntro key="confessionIntro" onComplete={() => handleScreenChange("message")} />
        )}
        {currentScreen === "message" && (
          <SpecialMessage key="message" onComplete={() => handleScreenChange("photos")} />
        )}
        {currentScreen === "photos" && <PhotoGallery key="photos" />}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2.5,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
        @KuldeepBheel
      </motion.div>
    </div>
  )
}
