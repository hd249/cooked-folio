"use client"

import { Container } from "@/components/common/Container"
import Return from "@/components/ui/Return"
import { Button } from "@/components/ui/Button"
import { RESUME_URL } from "@/lib/config"
import { motion } from "framer-motion"
import { Download, ExternalLink, FileText } from "lucide-react"

export default function ResumeViewer() {
  const getEmbedUrl = (url: string) => {
    if (url.includes("drive.google.com")) {
      return url.replace(/\/view.*/, "/preview").replace(/\/view$/, "/preview")
    }
    return url
  }

  const embedUrl = getEmbedUrl(RESUME_URL)

  return (
    <Container className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Return />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <Button variant="outline" size="sm" className="gap-2 rounded-lg">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>open new tab</span>
            </Button>
          </a>
          
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <Button size="sm" className="gap-2 shadow-lg shadow-primary/20 rounded-lg">
              <Download className="w-3.5 h-3.5" />
              <span>save pdf</span>
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight flex items-center gap-3">
          <FileText className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground/50" />
          <span>the paper trail</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          buzzwords arranged in a pleasing geometric pattern.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full h-[65vh] md:h-[85vh] bg-card/40 border border-white/5 rounded-lg overflow-hidden shadow-2xl relative group"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 -z-10">
          <span className="animate-pulse text-muted-foreground text-sm">loading document...</span>
        </div>

        <iframe
          src={embedUrl}
          className="w-full h-full border-none"
          allow="autoplay"
          title="Resume PDF"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-xs text-muted-foreground/40 font-mono"
      >
        * if the embed doesn&apos;t load, use the buttons above. google drive is moody.
      </motion.p>
    </Container>
  )
}