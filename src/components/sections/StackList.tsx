"use client"

import { STACK } from "@/lib/config"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"

export function StackList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <section className="mb-16 w-full">
      <h2 className="text-sm font-mono text-muted-foreground mb-6 uppercase tracking-wider pl-1 md:pl-0">
        // stack
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-2 md:gap-2.5"
      >
        {STACK.map((tech) => (
          <TechBadge key={tech.name} item={tech} variants={item} />
        ))}
      </motion.div>
    </section>
  )
}

function TechBadge({
  item,
  variants,
}: {
  item: (typeof STACK)[0]
  variants: any
}) {
  const Icon = item.icon
  return (
    <motion.div variants={variants}>
      <Button
        variant="ghost"
        className="h-auto py-2 px-3 md:px-4 bg-secondary/30 hover:bg-secondary/50 border border-white/5 cursor-default gap-2 font-normal"
      >
        <Icon className="h-4 w-4 md:h-4.5 md:w-4.5" style={{ color: item.color }} />
        <span className="text-xs md:text-[14px] text-muted-foreground/90">
          {item.name}
        </span>
      </Button>
    </motion.div>
  )
}