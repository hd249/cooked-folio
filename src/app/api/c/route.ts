import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://avi.byontriq.xyz";

function normalizeColor(value: string | undefined, fallback: string) {
  const v = (value || "").trim();
  if (!v) return fallback;
  if (/^[0-9a-fA-F]{3,8}$/.test(v)) return `#${v}`;
  return v;
}

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const dest = request.headers.get("sec-fetch-dest") || "";
  const wantsHtml = dest === "document" || accept.includes("text/html");

  if (wantsHtml) {
    const SITE_URL = request.nextUrl.origin;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Avi API</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #020617;
      color: #e5e7eb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Mono",
        ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
        monospace;
    }
    .wrap {
      padding: 1.75rem 2rem;
      border-radius: 1rem;
      background: rgba(15,23,42,0.9);
      border: 1px solid rgba(148,163,184,0.25);
      box-shadow: 0 18px 60px rgba(15,23,42,0.9);
      max-width: 480px;
      text-align: left;
    }
    h1 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #cbd5f5;
    }
    code {
      font-size: 0.78rem;
      padding: 0.15rem 0.35rem;
      border-radius: 999px;
      background: rgba(15,23,42,0.9);
      border: 1px solid rgba(148,163,184,0.35);
      color: #e5e7eb;
    }
    a {
      color: #3b82f6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Avi Badge API</h1>
    <p>This endpoint generates a dynamic badge script.</p>
    <p>To configure your badge, visit <a href="${SITE_URL}/cm">${SITE_URL}/cm</a>.</p>
    <p>GET requests here return JavaScript for the badge embed.</p>
  </div>
</body>
</html>`;
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  const searchParams = request.nextUrl.searchParams;

  const emojiParam = searchParams.get("emoji") || "🍳";
  const text1Param = searchParams.get("txt1") || "Cooked";
  const text2Param = searchParams.get("txt2") || "by";
  const text3Param = searchParams.get("txt3") || "Avi";

  const avParam = searchParams.get("av");
  const showAvatar =
    avParam === null ||
    avParam === "" ||
    avParam === "true" ||
    avParam === "1" ||
    avParam === "yes";

  const colorParam = searchParams.get("color") || "";
  const [c1, c2, c3] = colorParam.split(":");

  const colorText1 = normalizeColor(c1, "#06b6d4"); // Cyan
  const colorText2 = normalizeColor(c2, "#ffffff"); // White
  const colorText3 = normalizeColor(c3, "#22c55e"); // Green

  const config = {
    emoji: emojiParam,
    text1: text1Param,
    text2: text2Param,
    text3: text3Param,
    showAvatar,
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
    
    .avi-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: "Geist Mono", "JetBrains Mono", "Fira Code", monospace;
      font-size: 13px;
      line-height: 1;
      opacity: 0.9;
      text-decoration: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      -webkit-font-smoothing: antialiased;
    }
    .avi-badge:hover {
      opacity: 1;
      transform: translateY(-1px);
    }
    .avi-badge__emoji {
      font-size: 18px;
      line-height: 1;
      display: inline-block;
      transform: translateY(1px);
    }
    .avi-badge__label {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .avi-badge__text-1 {
      color: ${colorText1};
    }
    .avi-badge__text-2 {
      color: ${colorText2};
    }
    .avi-badge__text-3 {
      position: relative;
      display: inline-block;
      color: ${colorText3};
      font-weight: 500;
    }
    .avi-badge__text-3::after {
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
    .avi-badge__avatar {
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 99px;
      overflow: hidden;
      flex-shrink: 0;
      background: transparent;
      margin-left: 4px;
    }
    .avi-badge__avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.2s ease;
    }
    .avi-badge__avatar img:nth-child(2) {
      opacity: 0;
    }
    .avi-badge:hover .avi-badge__avatar img:nth-child(1) {
      opacity: 0;
    }
    .avi-badge:hover .avi-badge__avatar img:nth-child(2) {
      opacity: 1;
    }
  `;

  const js = `(() => {
    try {
      const cfg = ${JSON.stringify(config)};
      const script = document.currentScript;
      
      const styleId = "avi-badge-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = \`${css.replace(/\s+/g, " ")}\`; 
        document.head.appendChild(style);
      }

      const link = document.createElement("a");
      link.href = "https://avi.byontriq.xyz";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "avi-badge";

      const emoji = document.createElement("span");
      emoji.className = "avi-badge__emoji";
      emoji.textContent = cfg.emoji;

      const label = document.createElement("span");
      label.className = "avi-badge__label";

      const t1 = document.createElement("span");
      t1.className = "avi-badge__text-1";
      t1.textContent = cfg.text1 + " ";

      const t2 = document.createElement("span");
      t2.className = "avi-badge__text-2";
      t2.textContent = cfg.text2 + " ";

      const t3 = document.createElement("span");
      t3.className = "avi-badge__text-3";
      t3.textContent = cfg.text3;

      label.appendChild(t1);
      label.appendChild(t2);
      label.appendChild(t3);

      if (cfg.showAvatar) {
        const avatar = document.createElement("span");
        avatar.className = "avi-badge__avatar";
        const i1 = document.createElement("img");
        i1.src = "https://avi.byontriq.xyz/avatar/avatar.png";
        const i2 = document.createElement("img");
        i2.src = "https://avi.byontriq.xyz/avatar/avatar-fill.png";
        avatar.appendChild(i1);
        avatar.appendChild(i2);
        label.appendChild(avatar);
      }

      link.appendChild(emoji);
      link.appendChild(label);

      if (script) {
        script.parentNode?.insertBefore(link, script);
      }
    } catch (e) { console.error("Avi Badge Error:", e); }
  })();`;

  return new NextResponse(js, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}