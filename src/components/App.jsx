import React, { useState, useEffect, useRef } from "react";

const BackgroundMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef(null);

  const musicUrl =
    "https://cdn.pixabay.com/download/audio/2022/01/20/audio_d3705bdcf2.mp3?filename=ambient-piano-amp-strings-12099.mp3";

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      setAutoplayBlocked(true);
    };

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay blocked:", error);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    audio.volume = volume;

    const autoplayTimer = setTimeout(tryAutoplay, 1000);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      clearTimeout(autoplayTimer);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Play/Pause error:", error);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleVolume = () => {
    setShowVolume(!showVolume);
  };

  return (
    <div className="container">
      <audio ref={audioRef} src={musicUrl} loop />

      <div className="player">
        <div className="header">
          <div className="avatar">
            <img
              src="https://placehold.co/80x80"
              alt="Musical notes and sound waves"
              className="avatar-img"
            />
          </div>
          <h1 className="title">Anjali Sorry Song</h1>
          <p className="subtitle">Extremely Sorry Anjali, Please forgive me 😭</p>
        </div>

        {autoplayBlocked && (
          <div className="autoplay-warning">
            Listen to Song completely Please Anjali.
          </div>
        )}

        <div className="status">
          {isPlaying ? (
            <div className="music-wave">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="wave-bar"></div>
              ))}
            </div>
          ) : (
            <div className="paused-icon">
              <svg
                width="24"
                height="24"
                fill="gray"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="controls">
          <button onClick={togglePlay} className="play-btn">
            {isPlaying ? (
              <svg
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            )}
          </button>

          <button onClick={toggleVolume} className="volume-btn" title="Toggle volume slider">
            {volume === 0 ? (
              <svg
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
              </svg>
            ) : volume < 0.5 ? (
              <svg
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
              </svg>
            )}
          </button>
        </div>

        {showVolume && (
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
          </div>
        )}

        <div className="footer">
          <p>Anjalo Ahari I have created this customized song for you.</p>
          <p>
            Volume: {Math.round(volume * 100)}% | Status:{" "}
            {isPlaying ? "Playing" : "Paused"}
          </p>
        </div>
      </div>

      <style>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #312e81, #6b21a8, #be185d);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          font-family: Arial, sans-serif;
          animation: fadeIn 1s ease-in;
        }
        .player {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          text-align: center;
        }
        .header {
          margin-bottom: 2rem;
        }
        .avatar {
          width: 96px;
          height: 96px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #8b5cf6);
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
        }
        .avatar-img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
        }
        .title {
          font-size: 1.875rem;
          font-weight: bold;
          background: linear-gradient(90deg, #a5b4fc, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: #d1d5db;
          font-size: 0.875rem;
        }
        .autoplay-warning {
          background: rgba(202, 138, 4, 0.2);
          border: 1px solid rgba(202, 138, 4, 0.5);
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 1.5rem;
          color: #fbbf24;
          font-size: 0.875rem;
        }
        .status {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
        }
        .music-wave {
          display: flex;
          justify-content: space-between;
          width: 60px;
          height: 40px;
          align-items: flex-end;
        }
        .wave-bar {
          width: 4px;
          height: 20px;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 2px;
          animation: wave 1.2s ease-in-out infinite;
        }
        .wave-bar:nth-child(2) {
          animation-delay: 0.1s;
        }
        .wave-bar:nth-child(3) {
          animation-delay: 0.2s;
        }
        .wave-bar:nth-child(4) {
          animation-delay: 0.3s;
        }
        .wave-bar:nth-child(5) {
          animation-delay: 0.4s;
        }
        @keyframes wave {
          0%, 100% {
            height: 10px;
          }
          50% {
            height: 30px;
          }
        }
        .paused-icon svg {
          width: 24px;
          height: 24px;
          fill: gray;
        }
        .controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .play-btn, .volume-btn {
          background: linear-gradient(90deg, #4f46e5, #8b5cf6);
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .play-btn:hover, .volume-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }
        .play-btn:active, .volume-btn:active {
          transform: scale(0.95);
        }
        .play-btn svg, .volume-btn svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
        .volume-slider-container {
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }
        .volume-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.3);
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          border: none;
          margin-top: -5px;
          position: relative;
          z-index: 1;
        }
        .volume-slider::-webkit-slider-thumb:hover {
          background: #4f46e5;
          transform: scale(1.2);
        }
        .footer {
          font-size: 0.75rem;
          color: #d1d5db;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return <BackgroundMusicPlayer />;
}