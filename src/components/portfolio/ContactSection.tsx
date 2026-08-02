import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  ArrowUpRight,
  Send,
  CheckCircle,
  MessageSquare,
  X,
} from "lucide-react";
import { DotMatrixCanvas } from "@/components/ui/dot-matrix-canvas";
import { PERSONAL_INFO, FORM_SERVICE_OPTIONS, FORM_BUDGET_OPTIONS } from "@/data/portfolio-data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service option"),
  budget: z.string().optional(),
  message: z
    .string()
    .min(5, "Please describe what is slowing you down or holding your business back"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter,
  Instagram,
  Github,
  Linkedin,
};

const CONTACT_WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL as string | undefined;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [industryContext, setIndustryContext] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: FORM_SERVICE_OPTIONS[4] || FORM_SERVICE_OPTIONS[0],
      budget: FORM_BUDGET_OPTIONS[1],
      message: "",
    },
  });

  // Listen for industry-context events dispatched by CTA buttons
  useEffect(() => {
    const handler = (): void => {
      try {
        const pending = sessionStorage.getItem("pendingIndustryContext");
        if (!pending) return;
        sessionStorage.removeItem("pendingIndustryContext");
        setIndustryContext(pending);
        // Only pre-select service if user has not changed it from the default
        const currentService = getValues("service");
        if (
          currentService === FORM_SERVICE_OPTIONS[4] ||
          currentService === FORM_SERVICE_OPTIONS[0]
        ) {
          setValue("service", "Business Automation", { shouldDirty: false });
        }
      } catch {
        // sessionStorage may be restricted in some browser contexts
      }
    };
    window.addEventListener("industryContextSet", handler);
    return () => window.removeEventListener("industryContextSet", handler);
  }, [setValue, getValues]);

  const openMailtoFallback = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`New Project Inquiry - ${data.service}`);
    const contextLine = industryContext ? `\nInquiry Context: ${industryContext}` : "";
    const bodyText = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}${contextLine}\nBudget: ${data.budget || "Not specified"}\n\nProblem / Project Description:\n${data.message}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    setUsedFallback(false);

    if (!CONTACT_WEBHOOK_URL) {
      toast.success("Inquiry formatted! Opening your email client...");
      setUsedFallback(true);
      setSubmitted(true);
      openMailtoFallback(data);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: data.service,
          budget: data.budget || "Not specified",
          message: data.message,
          industryContext: industryContext || null,
          timestamp: new Date().toISOString(),
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);

      toast.success("Inquiry sent! I'll be in touch within 24 hours.");
      setSubmitted(true);
    } catch (error) {
      clearTimeout(timeoutId);
      const isTimeout = (error as Error)?.name === "AbortError";
      console.error("Contact webhook submission failed, falling back to email:", error);
      toast.error(
        isTimeout
          ? "Request timed out — opening your email client instead."
          : "Couldn't send automatically — opening your email client instead.",
      );
      setSubmitError(
        isTimeout
          ? "The automated service took longer than 10 seconds to respond, so we opened your email client with your formatted inquiry. Please send that email to make sure I receive it!"
          : "Your inquiry couldn't be delivered automatically, so we opened your email client instead. Please send that email to make sure I receive it.",
      );
      setUsedFallback(true);
      setSubmitted(true);
      openMailtoFallback(data);
    }
  };

  const onValidationError = (
    validationErrors: Partial<Record<keyof ContactFormValues, unknown>>,
  ) => {
    const firstKey = Object.keys(validationErrors)[0] as keyof ContactFormValues | undefined;
    if (firstKey) {
      const el = document.getElementById(`form-${firstKey}`);
      el?.focus();
    }
  };

  return (
    <section
      id="contact"
      className="scroll-target relative py-24 sm:py-36 border-t border-border/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-[620px] text-center mb-16">
          <div className="inline-flex items-center justify-center font-mono text-xs text-muted-foreground/50 mb-3 select-none">
            <span>[ 09 ]</span>
          </div>
          <div className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70 mb-3">
            Inquiry & Process Review
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12]">
            <span className="text-foreground">Tell me what is slowing you down</span>{" "}
            <span className="text-muted-foreground/60 font-normal">
              and I will map the simplest next step.
            </span>
          </h2>
        </div>

        <div className="rounded-2xl border border-border/40 bg-slate-950/70 p-8 sm:p-12 backdrop-blur-sm relative overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start relative">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-semibold block mb-2">
                [ ENGAGEMENT_PROCESS ]
              </span>
              <h3 className="text-2xl font-sans font-semibold text-foreground">
                Direct Review & Scope Alignment
              </h3>
              <p className="mt-4 text-sm text-muted-foreground/90 leading-relaxed max-w-lg">
                Describe the manual tasks, disconnected tools, or website challenges holding your
                business back. I will recommend the simplest practical architecture.
              </p>
              <div className="mt-6 space-y-2.5 font-mono text-xs text-muted-foreground/80">
                {[
                  "I review the problem and likely business impact.",
                  "You get a clear technical recommendation, not a sales script.",
                  "If there is a fit, we define a small first milestone.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">[✓]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Verified Contact Details */}
              <div className="mt-8 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-4 rounded-xl border border-border/30 bg-slate-900/40 p-3.5">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                      EMAIL
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border/30 bg-slate-900/40 p-3.5">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                      PHONE / WHATSAPP
                    </div>
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
              </div>
            </div>

            {/* Form Column */}
            <div className="rounded-xl border border-border/40 bg-slate-900/50 p-6 sm:p-8">
              {submitted ? (
                <div className="py-8 text-center space-y-4 font-mono text-xs">
                  <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-primary/20 text-primary mx-auto">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {usedFallback ? "Inquiry Formatted!" : "Inquiry Delivered!"}
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    {usedFallback
                      ? "Your inquiry has been compiled into your default email client."
                      : "Thanks for reaching out — I typically respond within 24 hours."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                      setUsedFallback(false);
                      setIndustryContext("");
                      reset();
                    }}
                    className="text-primary underline hover:opacity-80 pt-2 cursor-pointer uppercase tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4 font-mono text-xs">
                  <div className="uppercase tracking-widest text-primary font-semibold pb-2 border-b border-border/30 flex justify-between items-center">
                    <span>[ INQUIRY_FORM ]</span>
                    <span className="text-muted-foreground/50 text-[10px]">RESP &lt; 24H</span>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block uppercase tracking-widest text-muted-foreground/70 mb-1 text-[11px]"
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      aria-invalid={Boolean(errors.name)}
                      {...register("name")}
                      className="w-full rounded-lg bg-slate-950/80 border border-border/40 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                    />
                    {errors.name && (
                      <p className="text-red-400 mt-1 text-[11px]">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block uppercase tracking-widest text-muted-foreground/70 mb-1 text-[11px]"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="alex@company.com"
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                      className="w-full rounded-lg bg-slate-950/80 border border-border/40 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                    />
                    {errors.email && (
                      <p className="text-red-400 mt-1 text-[11px]">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="form-service"
                      className="block uppercase tracking-widest text-muted-foreground/70 mb-1 text-[11px]"
                    >
                      PRIMARY SERVICE NEEDED *
                    </label>
                    <select
                      id="form-service"
                      {...register("service")}
                      className="w-full rounded-lg bg-slate-950/80 border border-border/40 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                    >
                      {FORM_SERVICE_OPTIONS.map((svc) => (
                        <option key={svc} value={svc} className="bg-slate-900 text-foreground">
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="form-message"
                      className="block uppercase tracking-widest text-muted-foreground/70 mb-1 text-[11px]"
                    >
                      PROBLEM DESCRIPTION *
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      placeholder="Describe what is taking too much time or holding your business back..."
                      aria-invalid={Boolean(errors.message)}
                      {...register("message")}
                      className="w-full rounded-lg bg-slate-950/80 border border-border/40 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 mt-1 text-[11px]">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 uppercase tracking-widest font-semibold text-primary-foreground hover:opacity-90 transition-all cursor-pointer"
                  >
                    <span>Request Process Review</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
