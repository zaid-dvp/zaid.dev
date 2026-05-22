import { motion } from "framer-motion";
import { Mail, MessageCircle, Code, Briefcase, ArrowUpRight } from "lucide-react";
import { premiumEase, motionTimings } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ContactLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface ContactLinksGroupProps {
  contacts?: ContactLink[];
  variant?: "grid" | "stack" | "inline";
  animated?: boolean;
}

const defaultContacts: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: <Mail size={16} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/000000000000",
    icon: <MessageCircle size={16} />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/placeholder",
    icon: <Briefcase size={16} />,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/placeholder",
    icon: <Code size={16} />,
    external: true,
  },
];

export function ContactLinksGroup({
  contacts = defaultContacts,
  variant = "grid",
  animated = true,
}: ContactLinksGroupProps) {
  const containerClasses = {
    grid: "grid grid-cols-2 gap-3 sm:grid-cols-4",
    stack: "flex flex-col gap-2",
    inline: "flex flex-wrap gap-3",
  };

  return (
    <div className={containerClasses[variant]}>
      {contacts.map((contact, index) => (
        <motion.a
          key={contact.label}
          href={contact.href}
          target={contact.external ? "_blank" : undefined}
          rel={contact.external ? "noreferrer" : undefined}
          initial={animated ? { opacity: 0, y: 12 } : { opacity: 1 }}
          whileInView={animated ? { opacity: 1, y: 0 } : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: motionTimings.text,
            delay: animated ? index * 0.05 : 0,
            ease: premiumEase,
          }}
          whileHover={{ x: variant === "stack" ? 4 : 0, y: variant === "grid" ? -2 : 0 }}
          className={cn(
            "group relative flex items-center border border-white/10 bg-white/[0.02] transition hover:border-white/30 hover:bg-white/[0.04]",
            variant === "stack" ? "justify-between px-5 py-3.5" : "min-h-12 flex-1 flex-col justify-center gap-2.5 px-4 py-3"
          )}
        >
          <div className={cn("flex items-center gap-3", variant === "grid" && "flex-col gap-2")}>
            <div className="text-white/50 transition group-hover:text-white/90">
              {contact.icon}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 transition group-hover:text-white/90">
              {contact.label}
            </span>
          </div>
          {variant === "stack" && (
            <ArrowUpRight className="text-white/20 transition group-hover:text-white/60" size={14} />
          )}
          <div className="absolute inset-0 -z-10 border border-white/0 opacity-0 transition duration-300 group-hover:border-white/40 group-hover:opacity-100" />
        </motion.a>
      ))}
    </div>
  );
}
