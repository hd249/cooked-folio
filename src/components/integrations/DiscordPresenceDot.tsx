"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type DiscordPresence = "online" | "idle" | "dnd" | "offline"

const COLORS: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-gray-500/50",
}

interface DiscordPresenceDotProps {
  status: string | null
  className?: string
}

export default function DiscordPresenceDot({ status, className }: DiscordPresenceDotProps) {
  const safeStatus = status || "offline"
  const color = COLORS[safeStatus] || COLORS.offline

  return (
    <motion.div
      key={safeStatus}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={cn(
        "rounded-full border-background",
        color,
        className
      )}
    />
  )
}