import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { PERSONAL_INFO, FORM_SERVICE_OPTIONS, FORM_BUDGET_OPTIONS } from "@/data/portfolio-data";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)"),
  email: z.string().email("Please enter a valid email address so I can respond"),
  service: z.string().min(1, "Please select your primary service need"),
  budget: z.string().optional(),
  message: z
    .string()
    .min(
      5,
      "Please describe what is taking too much time or holding your business back (at least 5 characters)",
    ),
});

type ContactFormValues = z.infer<typeof contactSchema>;

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
    mode: "onBlur",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: FORM_SERVICE_OPTIONS[4] || FORM_SERVICE_OPTIONS[0],
      budget: FORM_BUDGET_OPTIONS[1],
      message: "",
    },
  });

  useEffect(() => {
    const handler = (): void => {
      try {
        const pending = sessionStorage.getItem("pendingIndustryContext");
        if (!pending) return;
        sessionStorage.removeItem("pendingIndustryContext");
        setIndustryContext(pending);
        const currentService = getValues("service");
        if (
          currentService === FORM_SERVICE_OPTIONS[4] ||
          currentService === FORM_SERVICE_OPTIONS[0]
        ) {
          setValue("service", "Business Automation", { shouldDirty: false });
        }
      } catch {
        // sessionStorage restricted fallback
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
      className="scroll-target relative py-24 sm:py-36 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-[620px] text-center mb-16">
          <div className="inline-flex items-center justify-center font-mono text-xs text-text-muted/60 mb-3 select-none">
            <span>[ 09 ]</span>
          </div>
          <div className="block font-mono text-[11px] uppercase tracking-widest text-text-muted mb-3 font-medium">
            Inquiry & Process Review
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12]">
            <span className="text-text-primary">Tell me what is slowing you down</span>{" "}
            <span className="text-text-muted/80 font-normal">
              and I will map the simplest next step.
            </span>
          </h2>
        </div>

        <div className="rounded-2xl border border-border-default bg-surface-raised/80 p-8 sm:p-12 backdrop-blur-md relative overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start relative">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-action-primary font-semibold block mb-2">
                [ ENGAGEMENT_PROCESS ]
              </span>
              <h3 className="text-2xl font-sans font-semibold text-text-primary">
                Direct Review & Scope Alignment
              </h3>
              <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-lg">
                Describe the manual tasks, disconnected tools, or website challenges holding your
                business back. I will recommend the simplest practical architecture.
              </p>
              <div className="mt-6 space-y-2.5 font-mono text-xs text-text-muted">
                {[
                  "I review the problem and likely business impact.",
                  "You get a clear technical recommendation, not a sales script.",
                  "If there is a fit, we define a small first milestone.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="text-status-success font-bold">[✓]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Verified Contact Details */}
              <div className="mt-8 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-surface-base/60 p-4 min-h-[44px]">
                  <Mail className="h-4 w-4 text-action-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted">
                      DIRECT EMAIL
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-text-primary hover:text-action-primary transition-colors font-medium focus-ring rounded-xs"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-surface-base/60 p-4 min-h-[44px]">
                  <Phone className="h-4 w-4 text-action-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted">
                      DIRECT PHONE / WHATSAPP
                    </div>
                    <a
                      href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-action-primary transition-colors font-medium focus-ring rounded-xs"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="rounded-xl border border-border-default bg-surface-base/80 p-6 sm:p-8">
              {submitted ? (
                <div className="py-8 text-center space-y-4 font-mono text-xs">
                  <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-status-success/20 text-status-success mx-auto">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {usedFallback ? "Inquiry Formatted!" : "Inquiry Delivered!"}
                  </h3>
                  <p className="text-text-muted max-w-sm mx-auto leading-relaxed">
                    {usedFallback
                      ? "Your inquiry has been compiled into your default email client."
                      : "Thank you — your inquiry has reached my queue. I will review your operational requirements and respond within 24 hours (GST)."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                      setUsedFallback(false);
                      setIndustryContext("");
                      reset();
                    }}
                    className="text-action-primary underline hover:opacity-80 pt-2 cursor-pointer uppercase tracking-wider min-h-[44px] inline-flex items-center justify-center focus-ring"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit, onValidationError)}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="uppercase tracking-widest text-action-primary font-semibold pb-2 border-b border-border-subtle flex justify-between items-center">
                    <span>[ INQUIRY_FORM ]</span>
                    <span className="text-text-muted/60 text-[10px]">GUARANTEED SLA &lt; 24H</span>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block uppercase tracking-widest text-text-muted mb-1 text-[11px] font-medium"
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      aria-invalid={Boolean(errors.name)}
                      {...register("name")}
                      className={`w-full rounded-lg bg-surface-overlay/80 border px-3.5 py-3 text-base sm:text-xs text-text-primary font-sans focus-ring transition-colors ${
                        errors.name
                          ? "border-status-danger text-status-danger"
                          : "border-border-default"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-status-danger mt-1 text-[11px] font-sans">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block uppercase tracking-widest text-text-muted mb-1 text-[11px] font-medium"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="alex@company.com"
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                      className={`w-full rounded-lg bg-surface-overlay/80 border px-3.5 py-3 text-base sm:text-xs text-text-primary font-sans focus-ring transition-colors ${
                        errors.email
                          ? "border-status-danger text-status-danger"
                          : "border-border-default"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-status-danger mt-1 text-[11px] font-sans">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="form-service"
                      className="block uppercase tracking-widest text-text-muted mb-1 text-[11px] font-medium"
                    >
                      PRIMARY SERVICE NEEDED *
                    </label>
                    <select
                      id="form-service"
                      {...register("service")}
                      className="w-full rounded-lg bg-surface-overlay/80 border border-border-default px-3.5 py-3 text-base sm:text-xs text-text-primary font-sans focus-ring"
                    >
                      {FORM_SERVICE_OPTIONS.map((svc) => (
                        <option
                          key={svc}
                          value={svc}
                          className="bg-surface-raised text-text-primary"
                        >
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="form-message"
                      className="block uppercase tracking-widest text-text-muted mb-1 text-[11px] font-medium"
                    >
                      PROBLEM DESCRIPTION *
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      placeholder="Describe what is taking too much time or holding your business back..."
                      aria-invalid={Boolean(errors.message)}
                      {...register("message")}
                      className={`w-full rounded-lg bg-surface-overlay/80 border px-3.5 py-3 text-base sm:text-xs text-text-primary font-sans resize-none focus-ring transition-colors ${
                        errors.message
                          ? "border-status-danger text-status-danger"
                          : "border-border-default"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-status-danger mt-1 text-[11px] font-sans">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-action-primary px-6 py-3.5 min-h-[44px] font-mono text-xs uppercase tracking-widest font-semibold text-action-primary-foreground hover:bg-action-primary-hover active:scale-[0.98] transition-all cursor-pointer focus-ring disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending inquiry payload...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Process Review</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
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
