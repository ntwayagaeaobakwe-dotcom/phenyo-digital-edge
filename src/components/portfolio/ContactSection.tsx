import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Twitter, Instagram, Github, Linkedin, ArrowUpRight, Send, CheckCircle, MessageSquare } from "lucide-react";
import { PERSONAL_INFO, FORM_SERVICE_OPTIONS, FORM_BUDGET_OPTIONS } from "@/data/portfolio-data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service option"),
  budget: z.string().optional(),
  message: z.string().min(5, "Please provide a brief project message"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter,
  Instagram,
  Github,
  Linkedin,
};

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: FORM_SERVICE_OPTIONS[0],
      budget: FORM_BUDGET_OPTIONS[1],
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    toast.success("Inquiry formatted! Opening your email client...");

    const subject = encodeURIComponent(`New Website Inquiry - ${data.service}`);
    const bodyText = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\nBudget: ${data.budget || "Not specified"}\n\nMessage:\n${data.message}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    setSubmitted(true);
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-border/40">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-gold rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-primary/30 shadow-[var(--shadow-elegant)]">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start relative">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Contact & Direct Line
              </div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Let's Engineer <span className="text-gradient-gold">Your Leverage</span>.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Whether you need custom n8n AI workflow automation, a trading content system, or a modern digital platform — let's build something that works.
              </p>

              {/* Verified Contact Details */}
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-4 glass p-3.5 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">EMAIL</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-foreground hover:text-primary transition-colors font-medium">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass p-3.5 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">PHONE / WHATSAPP</div>
                    <a
                      href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass p-3.5 rounded-2xl border border-border/60">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">LOCATION</div>
                    <div className="text-foreground font-medium">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>

              {/* Secondary WhatsApp CTA Button */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <a
                  href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full glass glass-hover px-6 py-3.5 text-sm font-medium text-foreground transition-all border border-emerald-500/30"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Message on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto sm:ml-0" />
                </a>
              </div>
            </div>

            {/* Functional Lead Capture Form */}
            <div className="glass rounded-2xl p-6 sm:p-8 border border-border/80 shadow-2xl">
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in">
                  <div className="inline-grid h-14 w-14 place-items-center rounded-full bg-primary/20 text-primary mx-auto">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold">Inquiry Formatted!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been compiled into your default email client. If it didn't open automatically, use the mail button below or message directly on WhatsApp.
                  </p>
                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] font-display"
                    >
                      Open Email Client <Send className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        reset();
                      }}
                      className="text-xs font-mono text-primary underline hover:opacity-80 pt-2 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold pb-1 border-b border-border/50 flex justify-between items-center">
                    <span>Project Inquiry Form</span>
                    <span className="text-[10px] text-muted-foreground">Response &lt; 24h</span>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      {...register("name")}
                      className="w-full rounded-xl bg-black/40 border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="alex@company.com"
                      {...register("email")}
                      className="w-full rounded-xl bg-black/40 border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="form-service" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      Service Needed *
                    </label>
                    <select
                      id="form-service"
                      {...register("service")}
                      className="w-full rounded-xl bg-black/40 border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      {FORM_SERVICE_OPTIONS.map((svc) => (
                        <option key={svc} value={svc} className="bg-background text-foreground">
                          {svc}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Budget Selection */}
                  <div>
                    <label htmlFor="form-budget" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      Budget Range (Optional)
                    </label>
                    <select
                      id="form-budget"
                      {...register("budget")}
                      className="w-full rounded-xl bg-black/40 border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      {FORM_BUDGET_OPTIONS.map((bgt) => (
                        <option key={bgt} value={bgt} className="bg-background text-foreground">
                          {bgt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      Project Details *
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      placeholder="Tell us about your automation or development requirements..."
                      {...register("message")}
                      className="w-full rounded-xl bg-black/40 border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Primary Form Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] font-display cursor-pointer"
                  >
                    Send Project Inquiry <Send className="h-4 w-4" />
                  </button>

                  {/* Social Links */}
                  <div className="pt-3 border-t border-border/50 grid grid-cols-2 gap-2">
                    {PERSONAL_INFO.socials.map((social) => {
                      const IconComponent = socialIconMap[social.iconName] || ArrowUpRight;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass rounded-xl p-2.5 flex items-center gap-2 hover:border-primary/40 transition-colors text-xs text-muted-foreground hover:text-foreground"
                        >
                          <IconComponent className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="truncate">{social.label}</span>
                          <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 opacity-60" />
                        </a>
                      );
                    })}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
