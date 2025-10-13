import {
  Github,
  Linkedin,
  Globe,
  Cpu,
  Palette,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { socialLinks } from "@/lib/content";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  codewithgpu: Cpu,
  modelscope: Sparkles,
  civitai: Palette,
  openart: ImageIcon,
};

export function SocialIcons() {
  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.id] ?? Globe;
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-mocha-primary/20 text-mocha-text transition-colors duration-200 hover:border-mocha-primary hover:text-mocha-primary"
            title={link.label}
            aria-label={link.label}
          >
            <Icon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-[2px]" />
          </a>
        );
      })}
    </div>
  );
}
