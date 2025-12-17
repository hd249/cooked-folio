"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import Return from "@/components/ui/Return"
import { Check, Copy } from "lucide-react"

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2 gap-1.5 rounded-lg border border-white/5 hover:bg-white/10 z-10"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span className="text-[10px] font-semibold text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">Copy</span>
        </>
      )}
    </Button>
  )
}

export default function CopyrightPage() {
  const [emoji, setEmoji] = useState("🍳")
  const [t1, setT1] = useState("Cooked")
  const [t2, setT2] = useState("by")
  const [t3, setT3] = useState("Avi")
  const [c1, setC1] = useState("#06b6d4")
  const [c2, setC2] = useState("#ffffff")
  const [c3, setC3] = useState("#22c55e")
  const [showAvatar, setShowAvatar] = useState(true)
  const [generatedUrl, setGeneratedUrl] = useState("")

  useEffect(() => {
    const clean = (c: string) => c.trim().replace("#", "")
    const cl1 = clean(c1)
    const cl2 = clean(c2)
    const cl3 = clean(c3)

    const params = new URLSearchParams()
    if (emoji && emoji !== "🍳") params.set("emoji", emoji)
    if (t1 && t1 !== "Cooked") params.set("txt1", t1)
    if (t2 && t2 !== "by") params.set("txt2", t2)
    if (t3 && t3 !== "Avi") params.set("txt3", t3)
    if (!showAvatar) params.set("av", "false")

    if (cl1 !== "06b6d4" || cl2 !== "ffffff" || cl3 !== "22c55e") {
      params.set("color", `${cl1}:${cl2}:${cl3}`)
    }

    const origin = typeof window !== "undefined" ? window.location.origin : ""
    setGeneratedUrl(`${origin}/api/c?${params.toString()}`)
  }, [emoji, t1, t2, t3, c1, c2, c3, showAvatar])

  const inputClass = "bg-[#0b1021] hover:bg-[#111629] focus:bg-[#111629] border-white/5 focus-visible:ring-blue-500/20 text-gray-200 placeholder:text-gray-600"
  const codeInputClass = "bg-[#050b1d] border-white/10 pr-24 py-3.5 text-xs font-mono text-gray-400 focus-visible:text-gray-200"

  return (
    <div className="layout-container min-h-screen flex flex-col justify-center py-12">
      <div className="w-full mb-8">
        <Return />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-[2rem] p-8 border border-white/10 shadow-2xl shadow-black/40 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="mb-8 relative z-10">
            <h2 className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
              Badge Configuration
            </h2>
          </div>
          
          <div className="space-y-7 relative z-10">
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase pl-1">Emoji</label>
              <Input 
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className={inputClass}
                placeholder="🍳"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase pl-1">Text Segments</label>
              <div className="grid grid-cols-3 gap-3">
                <Input 
                  value={t1}
                  onChange={(e) => setT1(e.target.value)}
                  className={inputClass}
                  placeholder="Cooked"
                />
                <Input 
                  value={t2}
                  onChange={(e) => setT2(e.target.value)}
                  className={inputClass}
                  placeholder="by"
                />
                <Input 
                  value={t3}
                  onChange={(e) => setT3(e.target.value)}
                  className={inputClass}
                  placeholder="Avi"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase pl-1">Colors (Hex)</label>
              <div className="grid grid-cols-3 gap-3">
                <Input 
                  value={c1}
                  onChange={(e) => setC1(e.target.value)}
                  className={inputClass}
                  placeholder="#06b6d4"
                />
                <Input 
                  value={c2}
                  onChange={(e) => setC2(e.target.value)}
                  className={inputClass}
                  placeholder="#ffffff"
                />
                <Input 
                  value={c3}
                  onChange={(e) => setC3(e.target.value)}
                  className={inputClass}
                  placeholder="#22c55e"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/5">
              <label className="flex items-center gap-3 cursor-pointer group select-none py-1">
                <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-300 ${showAvatar ? 'bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'border-gray-700 bg-transparent'}`}>
                  <input 
                    type="checkbox" 
                    checked={showAvatar}
                    onChange={(e) => setShowAvatar(e.target.checked)}
                    className="hidden"
                  />
                  {showAvatar && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">Show avatar on hover</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-[2rem] p-8 h-full border border-white/10 shadow-2xl shadow-black/40 flex flex-col relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="mb-8 relative z-10">
              <h2 className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                Live Preview
              </h2>
            </div>

            <div className="bg-gradient-to-br from-[#0c1222] to-[#020617] border border-white/5 rounded-2xl p-8 flex items-center justify-center min-h-[140px] mb-8 relative overflow-hidden shadow-inner group-hover:border-white/10 transition-colors">
               <style jsx>{`
                .preview-snake::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  bottom: -3px;
                  width: 100%;
                  height: 6px;
                  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%233b82f6' stroke-width='2' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%;
                  background-size: 20px 6px;
                  animation: avi-wavy-snake 1s linear infinite;
                  opacity: 0.8;
                }
                @keyframes avi-wavy-snake {
                  0% { background-position-x: 0; }
                  100% { background-position-x: 20px; }
                }
                .preview-avatar img:nth-child(2) { opacity: 0; }
                .preview-badge:hover .preview-avatar img:nth-child(1) { opacity: 0; }
                .preview-badge:hover .preview-avatar img:nth-child(2) { opacity: 1; }
                .preview-badge:hover { transform: translateY(-1px); }
              `}</style>

              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="preview-badge flex items-center gap-2 text-[13px] font-mono leading-none no-underline transition-all duration-200 opacity-90 hover:opacity-100"
              >
                <span className="text-[18px] translate-y-[1px]">{emoji}</span>
                <span className="flex items-center gap-[0.35rem]">
                  <span style={{ color: c1 }}>{t1}</span>
                  <span style={{ color: c2 }}>{t2}</span>
                  <span className="preview-snake relative font-medium" style={{ color: c3 }}>
                    {t3}
                  </span>
                  {showAvatar && (
                    <span className="preview-avatar relative w-6 h-6 rounded-full overflow-hidden shrink-0 bg-transparent ml-1">
                      <img src="https://avi.byontriq.xyz/avatar/avatar.png" alt="Avi" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200" />
                      <img src="https://avi.byontriq.xyz/avatar/avatar-fill.png" alt="Avi" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200" />
                    </span>
                  )}
                </span>
              </a>
            </div>

            <div className="space-y-6 mt-auto relative z-10">
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase pl-1">Script URL</label>
                <div className="relative group/copy">
                  <Input 
                    readOnly
                    value={generatedUrl}
                    className={codeInputClass}
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <CopyButton content={generatedUrl} />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase pl-1">Embed Snippet</label>
                <div className="relative group/copy">
                  <Input
                    readOnly
                    value={`<script src="${generatedUrl}"></script>`}
                    className={codeInputClass}
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <CopyButton content={`<script src="${generatedUrl}"></script>`} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}