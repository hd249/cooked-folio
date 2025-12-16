"use client";

import { SlideToVibeButton } from "@/components/vibe-check/SlideToVibeButton";
import Return from "@/components/ui/Return";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw, Send, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const audioFiles = [
  "/audio/song1.mp3",
  "/audio/song2.mp3",
  "/audio/song3.mp3",
  "/audio/song4.mp3",
  "/audio/song5.mp3",
];

const cyclingImages = [
  "/images/monkeys/monkey-1.png",
  "/images/monkeys/monkey-2.png",
  "/images/monkeys/monkey-3.png",
  "/images/monkeys/monkey-4.png",
  "/images/monkeys/monkey-5.png",
];

const ANGRY_MESSAGES = [
  " Bruh, you just killed the vibe! Top 10 Anime Betrayals",
  "Not cool, bro. Not cool.",
  "Who gave you the aux?",
  "Explain yourself.",
  "Unbelievable! Ruined it.",
];

export default function Vibing() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChangingSong, setIsChangingSong] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [pauseCount, setPauseCount] = useState(0);

  const [showAngryState, setShowAngryState] = useState(false);

  const [showSongModal, setShowSongModal] = useState(false);
  const [songSuggestion, setSongSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const randomSong =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];
    setCurrentSong(randomSong);
  }, []);

  useEffect(() => {
    if (!hasEntered || !isPlaying) return;
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cyclingImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [hasEntered, isPlaying]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (hasEntered && !isPlaying) {
      timeout = setTimeout(() => {
        setShowAngryState(true);
      }, 2000);
    } else {
      setShowAngryState(false);
    }

    return () => clearTimeout(timeout);
  }, [hasEntered, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentSong]);

  const handleEnter = () => {
    if (hasEntered || isPreparing || !audioRef.current) return;

    setIsPreparing(true);

    const playAudioOnReady = () => {
      setHasEntered(true);
      setIsPreparing(false);
      audioRef.current?.play().catch((e) => console.error(e));
    };

    if (audioRef.current.readyState >= 3) {
      playAudioOnReady();
    } else {
      audioRef.current.addEventListener("canplaythrough", playAudioOnReady, {
        once: true,
      });
      audioRef.current.load();
    }
  };

  const handleChangeSong = () => {
    if (!audioRef.current || isChangingSong) return;

    setIsChangingSong(true);

    const availableSongs = audioFiles.filter((song) => song !== currentSong);
    const newSong =
      availableSongs[Math.floor(Math.random() * availableSongs.length)];

    setCurrentSong(newSong);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => setIsChangingSong(false))
          .catch((e) => {
            console.error(e);
            setIsChangingSong(false);
          });
      }
    }, 50);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setPauseCount((prev) => prev + 1);
    } else {
      audioRef.current.play().catch((e) => console.error(e));
    }
  };

  const handleSubmitSong = async () => {
    if (!songSuggestion.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/song-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song: songSuggestion.trim() }),
      });

      if (!res.ok) throw new Error("failed to submit");

      setSubmitStatus("success");
      setSongSuggestion("");

      setTimeout(() => {
        setShowSongModal(false);
        setSubmitStatus("idle");
      }, 1500);
    } catch (e) {
      console.error(e);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSongModal(false);
    setSongSuggestion("");
    setSubmitStatus("idle");
  };

  const getAngryMessage = () => {
    const index = Math.max(0, pauseCount - 1) % ANGRY_MESSAGES.length;
    return ANGRY_MESSAGES[index];
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col items-center justify-center overflow-hidden relative px-4">
      {currentSong && (
        <audio ref={audioRef} src={currentSong} loop preload="auto" />
      )}

      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {hasEntered ? (
            <motion.div
              key="vibes-content"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Return className="mb-8" />

              <div className="relative min-h-[18rem] md:h-96 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {showAngryState ? (
                    <motion.div
                      key="angry-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="text-center px-2 max-w-2xl mx-auto"
                    >
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-red-200 leading-tight inline">
                        {getAngryMessage()}
                        <span className="relative inline-block w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 align-middle ml-2 -mt-1 sm:-mt-2">
                          <Image
                            src="/avatar/avatar-angry.png"
                            alt="Angry Avi"
                            fill
                            className="object-contain"
                          />
                        </span>
                      </h2>
                    </motion.div>
                  ) : (
                    <div className="relative w-72 h-72 md:w-96 md:h-96">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={currentImageIndex}
                          initial={{
                            opacity: 0,
                            scale: 0.95,
                            filter: "blur(8px)",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            scale: 1.05,
                            filter: "blur(8px)",
                          }}
                          transition={{ duration: 1.5, ease: "anticipate" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={cyclingImages[currentImageIndex]}
                            alt="vibes"
                            fill
                            className="object-contain"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex items-center gap-4"
              >
                <button
                  onClick={handleTogglePlay}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isPlaying ? "pause" : "play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={handleChangeSong}
                  disabled={isChangingSong}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                  aria-label="change song"
                >
                  <RotateCcw
                    className={`w-5 h-5 ${
                      isChangingSong ? "animate-spin" : ""
                    }`}
                  />
                </button>

                <button
                  onClick={() => setShowSongModal(true)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="suggest a song"
                >
                  <Send className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="slider-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, pointerEvents: "none" }}
              transition={{ duration: 0.5 }}
              className="z-20 w-full max-w-sm px-4"
            >
              <SlideToVibeButton
                onUnlock={handleEnter}
                disabled={isPreparing || !currentSong}
                label={isPreparing ? "loading tunes..." : "slide to vibe"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSongModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md px-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  suggest a song
                </span>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={songSuggestion}
                onChange={(e) => setSongSuggestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitSong()}
                placeholder="song name or link..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                autoFocus
              />

              <button
                onClick={handleSubmitSong}
                disabled={!songSuggestion.trim() || isSubmitting}
                className="mt-4 w-full py-3 text-sm font-medium bg-white/10 text-foreground rounded-2xl hover:bg-white/15 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    sending...
                  </span>
                ) : submitStatus === "success" ? (
                  "sent! 🎵"
                ) : submitStatus === "error" ? (
                  "failed, try again"
                ) : (
                  "submit"
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}