import ResumeViewer from "@/components/ui/ResumeViewer";
import { constructMetadata } from "@/lib/site-config";

export const metadata = constructMetadata({
  title: "hire me ps ps",
  description: "the paper trail. hire me.",
});

export default function ResumePage() {
  return <ResumeViewer />;
}