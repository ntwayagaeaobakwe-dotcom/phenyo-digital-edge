import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Phone, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO, FORM_SERVICE_OPTIONS } from "@/data/portfolio-data";
import { trackAcceptedLead } from "@/lib/analytics";
import {
  contactFormSchema,
  type ContactFormValues,
  type ValidatedContactFormValues,
} from "@/lib/contact-intake";
import { SectionShell } from "./SectionShell";

const DEFAULT_SERVICE = "Not sure — I’ll describe the requirement";
const SERVICE_PAGE_MAP: Record<string, string> = {
  "/services/web-design": "Website Design",
  "/services/website-redesign": "Website Redesign",
  "/services/custom-web-development": "Custom Web Development",
};

type Attempt = { fingerprint: string; submissionId: string };

function createSubmissionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [industryContext, setIndustryContext] = useState("");
  const [sourcePath, setSourcePath] = useState("/");
  const [submissionError, setSubmissionError] = useState("");
  const attemptRef = useRef<Attempt | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ValidatedContactFormValues>({
    mode: "onBlur",
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: DEFAULT_SERVICE,
      message: "",
      companyWebsite: "",
    },
  });
  const values = watch();

  useEffect(() => {
    try {
      const search = new URLSearchParams(window.location.search);
      const source = search.get("source") ?? "/";
      const requestedService = search.get("service") ?? "";
      const expectedService = SERVICE_PAGE_MAP[source];

      if (expectedService && requestedService === expectedService) {
        setSourcePath(source);
        setValue("service", expectedService);
      }
    } catch {
      setSourcePath("/");
    }
  }, [setValue]);

  useEffect(() => {
    const handler = (): void => {
      try {
        const pending = sessionStorage.getItem("pendingIndustryContext");
        if (!pending) return;
        sessionStorage.removeItem("pendingIndustryContext");
        setIndustryContext(pending.slice(0, 300));
        setValue("message", `[Selected Focus: ${pending.slice(0, 300)}]\n`, {
          shouldDirty: true,
        });
      } catch {
        // Continue with the information already entered in the form.
      }
    };
    handler();
    window.addEventListener("industryContextSet", handler);
    return () => window.removeEventListener("industryContextSet", handler);
  }, [setValue]);

  const openMailtoFallback = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`NYG Digital Website Inquiry - ${data.service}`);
    const contextLine = industryContext ? `\nContext: ${industryContext}` : "";
    const bodyText = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}${contextLine}\n\nProject Scope:\n${data.message}`;
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const onSubmit = async (data: ValidatedContactFormValues) => {
    setSubmissionError("");
    const submissionFields = {
      name: data.name.trim().replace(/\s+/g, " "),
      email: data.email.trim().toLowerCase(),
      service: data.service,
      message: data.message.trim(),
      industryContext: industryContext || null,
      sourcePath,
    };
    const fingerprint = JSON.stringify(submissionFields);
    if (!attemptRef.current || attemptRef.current.fingerprint !== fingerprint) {
      attemptRef.current = { fingerprint, submissionId: createSubmissionId() };
    }

    const submissionId = attemptRef.current.submissionId;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          ...submissionFields,
          submissionId,
          companyWebsite: data.companyWebsite ?? "",
        }),
      });
      window.clearTimeout(timeoutId);

      const result = (await response.json().catch(() => null)) as {
        accepted?: unknown;
        recorded?: unknown;
        submissionId?: unknown;
      } | null;
      if (
        response.status !== 202 ||
        result?.accepted !== true ||
        result.recorded !== true ||
        result.submissionId !== submissionId
      ) {
        throw new Error("Inquiry was not confirmed as recorded.");
      }

      trackAcceptedLead(submissionId, data.service, sourcePath);
      setSubmitted(true);
      toast.success("Your inquiry has been recorded.");
    } catch {
      window.clearTimeout(timeoutId);
      setSubmissionError(
        "We couldn’t confirm that your inquiry was recorded. Your details are still here. Retry, or contact NYG Digital using one of the options below.",
      );
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Discuss your website"
      declarativeTitle="Tell us what your website needs to achieve."
      qualifierTitle="Share the current situation, the audience and the outcome you want. We’ll reply with a practical next step."
      className="contact-section"
    >
      <div className="contact-layout">
        <div className="contact-intro">
          <p>
            A new website, a focused redesign or a customer journey that needs to work better. Tell
            us what you have today and what you want to make easier.
          </p>
          <p className="contact-reassurance">
            Direct access to the founder.
            <br />
            Practical recommendations. Clear scope.
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
          <p className="contact-note">We’ll reply using the contact details you provide.</p>
        </div>
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success" role="status">
              <CheckCircle2 size={38} strokeWidth={1.2} />
              <h3>Your inquiry has been recorded.</h3>
              <p>
                NYG Digital will follow up using the email address you provided. This confirms the
                inquiry was recorded; it does not confirm delivery of an email notification.
              </p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setSubmitted(false);
                  setSubmissionError("");
                  attemptRef.current = null;
                  reset({
                    name: "",
                    email: "",
                    service: SERVICE_PAGE_MAP[sourcePath] ?? DEFAULT_SERVICE,
                    message: "",
                    companyWebsite: "",
                  });
                }}
              >
                Start another inquiry <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="enquiry-privacy">
              <input
                className="sr-only"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                {...register("companyWebsite")}
              />
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
                    required
                    maxLength={150}
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
                    required
                    maxLength={254}
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
                  required
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
                  placeholder="Your current website, the audience, the main challenge and the outcome you want…"
                  required
                  maxLength={5000}
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
              {submissionError && (
                <div className="form-error" role="alert">
                  <p>{submissionError}</p>
                  <button
                    type="button"
                    className="text-link"
                    disabled={isSubmitting}
                    onClick={() => void handleSubmit(onSubmit)()}
                  >
                    Retry inquiry <ArrowUpRight size={16} />
                  </button>
                  <a className="text-link" href={openMailtoFallback(values)}>
                    Open a prepared email <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
              <p className="form-privacy" id="enquiry-privacy">
                We use your details to discuss and respond to your enquiry. Please do not include
                passwords, identity documents or sensitive customer information. Sending an enquiry
                does not subscribe you to marketing. Read our <a href="/privacy">Privacy Policy</a>.
              </p>
              <button type="submit" disabled={isSubmitting} className="button contact-submit">
                {isSubmitting ? (
                  <>
                    <span>Sending inquiry…</span>
                    <Loader2 className="animate-spin" size={18} />
                  </>
                ) : (
                  <>
                    <span>
                      {submissionError ? "Retry project inquiry" : "Send project inquiry"}
                    </span>
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
              <p className="form-footnote">
                Your inquiry is confirmed only after it has been accepted and recorded.
              </p>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
