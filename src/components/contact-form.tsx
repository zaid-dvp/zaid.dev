import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextScramble } from "@/components/ui/text-scramble";
import { motionTimings } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  onSubmit?: (formData: FormData) => void;
  showWhatsAppLink?: boolean;
}

export function ContactForm({ 
  onSubmit,
}: ContactFormProps) {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    
    if (onSubmit) {
      onSubmit(form);
    }

    const name = form.get("name") as string;
    const contact = form.get("contact") as string;
    const projectType = form.get("projectType") as string;
    const message = form.get("message") as string;

    // TODO: replace mailto fallback with POST /api/contact or Formspree/Resend/Supabase integration.
    const mailtoLink = `mailto:hello@example.com?subject=Project Inquiry: ${encodeURIComponent(projectType)}&body=Name: ${encodeURIComponent(name)}%0AContact: ${encodeURIComponent(contact)}%0AProject Type: ${encodeURIComponent(projectType)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  const inputClasses = "min-h-12 w-full border border-white/15 bg-black px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/70 focus:ring-1 focus:ring-white/30";
  const labelClasses = "grid gap-2 text-xs uppercase tracking-[0.1em] text-white/80 font-mono";

  return (
    <div className="contact-terminal group/terminal relative overflow-hidden border border-white/15 bg-black/84 shadow-[0_0_34px_rgba(255,255,255,0.03)] backdrop-blur transition-all duration-500 focus-within:border-white/30 focus-within:shadow-[0_0_48px_rgba(255,255,255,0.06)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-focus-within/terminal:opacity-100" />
      <div className="flex items-center justify-between border-b border-white/12 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 sm:text-xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-white/80">message.form</span>
          <span className="hidden sm:inline">status: awaiting_input</span>
          <span className="hidden sm:inline">mode: freelance_request</span>
        </div>
        <span className="contact-cursor h-3 w-1 bg-white/60" />
      </div>

      <motion.form
        key="form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: motionTimings.text }}
        className="grid gap-5 p-5 sm:gap-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClasses}>
            Name
            <input
              name="name"
              required
              className={inputClasses}
              placeholder="Your name"
            />
          </label>
          <label className={labelClasses}>
            Email or WhatsApp
            <input
              name="contact"
              required
              className={inputClasses}
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className={labelClasses}>
          Project type
          <Select.Root name="projectType" defaultValue="Not Sure Yet">
            <Select.Trigger className={cn(inputClasses, "flex items-center justify-between hover:border-white/30")}>
              <Select.Value placeholder="Select project type" />
              <Select.Icon>
                <ChevronDown size={16} className="text-white/50" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content 
                position="popper" 
                sideOffset={4} 
                className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden border border-white/20 bg-black shadow-[0_4px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              >
                <Select.Viewport className="p-1.5">
                  {[
                    "Landing Page",
                    "Business Website",
                    "Student/FYP Project",
                    "Website Redesign",
                    "Custom Frontend UI",
                    "Not Sure Yet"
                  ].map(option => (
                    <Select.Item 
                      key={option} 
                      value={option}
                      className="relative flex cursor-pointer select-none items-center px-3 py-2.5 font-mono text-sm text-neutral-300 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-white/10 data-[highlighted]:bg-white/15 data-[highlighted]:text-white"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </label>
        <label className={labelClasses}>
          Message
          <textarea
            name="message"
            required
            className={cn(inputClasses, "min-h-36 resize-y")}
            placeholder="Tell me what you want to build..."
          />
        </label>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <MagneticButton
            type="submit"
            className="group/submit border-transparent bg-white text-black hover:border-transparent hover:bg-white hover:text-black hover:invert"
          >
            <TextScramble text="SUBMIT INFO" className="font-bold tracking-[0.16em]" />
            <Send size={15} className="transition-transform group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton
            href="https://wa.me/000000000000"
            target="_blank"
            rel="noreferrer"
            className="group/wa border-white/15 hover:border-white/70 hover:bg-white/5 hover:text-white"
          >
            <TextScramble text="WHATSAPP" className="tracking-[0.16em]" />
            <MessageCircle size={15} className="text-white/60 transition-colors group-hover/wa:text-white" />
          </MagneticButton>
        </div>
        <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
          No backend configured yet. Please use WhatsApp or email for immediate contact.
        </p>
      </motion.form>
    </div>
  );
}
