import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Phone, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO, FORM_SERVICE_OPTIONS } from "@/data/portfolio-data";
import { SectionShell } from "./SectionShell";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)"),
  email: z.string().email("Please enter a valid business email address"),
  service: z.string().min(1, "Please select your primary requirement"),
  message: z
    .string()
    .min(5, "Please describe the manual bottlenecks or system goals (at least 5 characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const CONTACT_WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL as string | undefined;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [industryContext, setIndustryContext] = useState("");
  const [usedFallback, setUsedFallback] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: FORM_SERVICE_OPTIONS[0],
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
        setValue("message", `[Selected Focus: ${pending}]\n`, { shouldDirty: true });
      } catch {
        // storage fallback
      }
    };
    handler();
    window.addEventListener("industryContextSet", handler);
    return () => window.removeEventListener("industryContextSet", handler);
  }, [setValue]);

  const openMailtoFallback = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`NYG Agency System Inquiry - ${data.service}`);
    const contextLine = industryContext ? `\nContext: ${industryContext}` : "";
    const bodyText = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}${contextLine}\n\nProject Scope:\n${data.message}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
  };

  const onSubmit = async (data: ContactFormValues) => {
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
          message: data.message,
          industryContext: industryContext || null,
          timestamp: new Date().toISOString(),
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);

      toast.success("Inquiry received! I'll personally respond within 24 hours.");
      setSubmitted(true);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Contact submission error, falling back to email:", error);
      toast.error("Opening your email client to deliver inquiry directly.");
      setUsedFallback(true);
      setSubmitted(true);
      openMailtoFallback(data);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Start a project"
      declarativeTitle="Let’s define your next move."
      qualifierTitle="Tell us what needs to work better. We’ll help define the scope and the next step."
      className="contact-section"
    >
      <div className="contact-layout">
        <div className="contact-intro">
          <p>
            A new website. A smarter workflow. A problem worth solving. Tell us what you have in
            mind, and we’ll find the next step together.
          </p>
          <p className="contact-reassurance">
            Direct access to the founder.
            <br />
            Thoughtful recommendations. Clear scope.
          </p>
          <a className="contact-direct" href={`mailto:${PERSONAL_INFO.email}`}>
            <Mail size={19} />
            <span>{PERSONAL_INFO.email}</span>
            <ArrowUpRight size={19} />
          </a>
          <a
            className="contact-direct"
            href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone size={19} />
            <span>
              Talk on WhatsApp<small>{PERSONAL_INFO.phone}</small>
            </span>
            <ArrowUpRight size={19} />
          </a>
          <p className="contact-note">Response target: within 24 hours (GST).</p>
        </div>
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success" role="status">
              <CheckCircle2 size={38} strokeWidth={1.2} />
              <h3>{usedFallback ? "Your inquiry is ready." : "Thank you. We’re on it."}</h3>
              <p>
                {usedFallback
                  ? "We’ve opened your email app with the details. Press send there to deliver your inquiry. If your email app didn’t open, use the direct email link."
                  : "Your inquiry has been received. We’ll review your project and respond within 24 hours (GST)."}
              </p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setSubmitted(false);
                  setUsedFallback(false);
                  reset();
                }}
              >
                Start another inquiry <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="form-name">
                    Your name <span>*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p className="form-error" id="name-error" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="email">
                    Email address <span>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p className="form-error" id="email-error" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="service">
                  What can we help with? <span>*</span>
                </label>
                <select
                  id="service"
                  {...register("service")}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? "service-error" : undefined}
                >
                  {FORM_SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="form-error" id="service-error" role="alert">
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="message">
                  Tell us about your project <span>*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="The idea, the challenge, or what you’d like to make possible…"
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p className="form-error" id="message-error" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button type="submit" disabled={isSubmitting} className="button contact-submit">
                {isSubmitting ? (
                  <>
                    <span>Sending inquiry…</span>
                    <Loader2 className="animate-spin" size={18} />
                  </>
                ) : (
                  <>
                    <span>
                      {CONTACT_WEBHOOK_URL ? "Send project inquiry" : "Prepare project email"}
                    </span>
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
              <p className="form-footnote">
                {CONTACT_WEBHOOK_URL
                  ? "Your details are used to respond to your project inquiry."
                  : "Opens your email app. Review your message and press send."}
              </p>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
