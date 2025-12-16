import { constructMetadata } from "@/lib/site-config";
import Vibing from "../../components/vibe-check/Vibing";

export const metadata = constructMetadata({
  title: "slide to vibe",
  description: "monke see. monke listen. vibes unlocked.",
});

export default function WhatPage() {
  return <Vibing />;
}