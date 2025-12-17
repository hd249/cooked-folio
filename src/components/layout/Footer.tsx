"use client"

import { CAL_URL, FIVERR_URL } from "@/lib/config"
import { getCalApi } from "@calcom/embed-react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Mail, Paperclip, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { SiFiverr } from "react-icons/si"
import { Button } from "@/components/ui/Button"

export function Footer() {
  const scriptContainerRef = useRef<HTMLDivElement>(null)
  const [isCalLoading, setIsCalLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#ffffff" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      })

      cal("on", {
        action: "linkReady",
        callback: () => {
          setTimeout(() => setIsCalLoading(false), 800)
        },
      })
    })()
  }, [])

  useEffect(() => {
    if (!scriptContainerRef.current) return
    if (scriptContainerRef.current.innerHTML !== "") return

    const script = document.createElement("script")
    script.src = "https://avi.byontriq.xyz/api/c?color=06b6d4%3Affffff%3A54C41A"
    script.async = true

    scriptContainerRef.current.appendChild(script)
  }, [])

  const calLink = CAL_URL.replace(/^https?:\/\/(www\.)?cal\.com\//, "")

  useEffect(() => {
    if (isCalLoading) {
      const timer = setTimeout(() => setIsCalLoading(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [isCalLoading])

  return (
    <>
      <AnimatePresence>
        {isCalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="relative w-16 h-16"
            >
              <Image
                src="/avatar/avatar.png"
                alt="loading..."
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 pb-8 pt-8 border-t border-white/5 text-sm text-muted-foreground font-mono">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="text-foreground font-medium text-base tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground/80 max-w-md leading-relaxed">
              I&apos;m always open to discussing new opportunities, crazy ideas,
              or just chatting about tech.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* BOOK A CALL - Custom Motion Button */}
            <motion.button
              onClick={() => setIsCalLoading(true)}
              data-cal-link={calLink}
              data-cal-config='{"layout":"month_view","hideEventTypeDetails":true}'
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="
                group relative flex items-center overflow-hidden
                h-12 pl-2 pr-5
                bg-foreground/5 hover:bg-foreground/10 
                border border-border/50 hover:border-border
                rounded-lg 
                transition-all duration-300
                cursor-pointer
              "
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md mr-3">
                <Image
                  src="/avatar/avatar.png"
                  alt="avi"
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <Image
                  src="/avatar/avatar-fill.png"
                  alt="avi"
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />
              </div>

              <div className="flex items-center">
                <motion.div
                  variants={{
                    initial: { width: 0, opacity: 0, marginRight: 0 },
                    hover: { width: "auto", opacity: 1, marginRight: 8 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                  <div className="h-5 px-1.5 rounded-sm bg-background border border-border flex items-center justify-center">
                    <span className="text-[10px] font-medium text-foreground">
                      You
                    </span>
                  </div>
                </motion.div>
                <span className="text-[15px] font-medium text-foreground">
                  Book a call
                </span>
              </div>
            </motion.button>

            {/* HIRE ON FIVERR - Standard Button wrapped in Link */}
            <Link href={FIVERR_URL} target="_blank" tabIndex={-1}>
              <Button
                variant="outline"
                className="h-12 gap-3 pl-5 pr-4 rounded-lg border-border/50 hover:border-[#1dbf73]/50 hover:bg-[#1dbf73]/5 group"
              >
                <SiFiverr className="w-5 h-5 text-muted-foreground group-hover:text-[#1dbf73] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Hire on Fiverr
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-[#1dbf73] transition-colors duration-300" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-6">
              <a
                href="mailto:avilovesburger@gmail.com"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>send email</span>
              </a>
              <Link
                href="/resume"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Paperclip className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>view resume</span>
              </Link>
            </div>
            <div ref={scriptContainerRef} className="pt-2" />
          </div>
        </div>
      </footer>
    </>
  )
}