import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Phone, Send, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO, FORM_SERVICE_OPTIONS, FORM_BUDGET_OPTIONS } from "@/data/portfolio-data";
import { SectionShell } from "./SectionShell";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)"),
  email: z.string().email("Please enter a valid business email address"),
  service: z.string().min(1, "Please select your primary requirement"),
  budget: z.string().optional(),
  message: z
    .string()
    .min(5, "Please describe the manual bottlenecks or system goals (at least 5 characters)"),
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
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: FORM_SERVICE_OPTIONS[0],
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
        setValue("message", `[Bottleneck Diagnostic: ${pending}]\n`, { shouldDirty: true });
      } catch {
        // storage fallback
      }
    };
    window.addEventListener("industryContextSet", handler);
    return () => window.removeEventListener("industryContextSet", handler);
  }, [setValue]);

  const openMailtoFallback = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`NYG Digital System Inquiry - ${data.service}`);
    const contextLine = industryContext ? `\nContext: ${industryContext}` : "";
    const bodyText = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}${contextLine}\nBudget: ${data.budget || "Not specified"}\n\nProject Scope:\n${data.message}`;
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
      eyebrow="Direct Architecture Review"
      iconGlyph="07"
      themeVariant="ink"
      declarativeTitle="Tell me what is slowing you down"
      qualifierTitle="and I will map the simplest next step."
    >
      <div className="rounded-3xl border border-[rgba(184,181,172,0.18)] bg-[#082D2D]/85 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
          {/* Left 5 Columns: Engagement Commitment & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#5FD8CD] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5FD8CD] animate-pulse" />
              <span>[ 24H_DIRECT_SLA ]</span>
            </div>

            <h3 className="text-3xl font-serif font-normal text-[#F3F0E8] tracking-tight leading-tight">
              Direct review with the builder.
            </h3>

            <p className="text-sm text-[#B8B5AC] leading-relaxed font-sans font-normal">
              Describe the manual tasks, broken handoffs, or website challenges holding your
              business back. You will receive a clear technical recommendation, not a sales script.
            </p>

            <div className="space-y-3 font-mono text-xs text-[#B8B5AC] pt-2">
              {[
                "Direct review of your actual workflow bottlenecks.",
                "Clear architectural recommendation & software stack.",
                "If aligned, we build a working prototype first.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#5FD8CD] font-bold">[✓]</span>
                  <span className="text-[#F3F0E8] font-sans text-xs">{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-4 border-t border-[rgba(184,181,172,0.14)]">
              <div className="flex items-center gap-4 rounded-2xl border border-[rgba(184,181,172,0.14)] bg-[#080A09]/60 p-4">
                <Mail className="h-4 w-4 text-[#5FD8CD] shrink-0" />
                <div className="flex flex-col text-xs font-mono">
                  <span className="text-[10px] text-[#B8B5AC]">DIRECT EMAIL</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[#F3F0E8] hover:text-[#5FD8CD] transition-colors font-medium font-sans"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[rgba(184,181,172,0.14)] bg-[#080A09]/60 p-4">
                <Phone className="h-4 w-4 text-[#5FD8CD] shrink-0" />
                <div className="flex flex-col text-xs font-mono">
                  <span className="text-[10px] text-[#B8B5AC]">DIRECT WHATSAPP (UAE)</span>
                  <a
                    href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3F0E8] hover:text-[#5FD8CD] transition-colors font-medium font-sans"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Precision Paper Form Plane */}
          <div className="lg:col-span-7 rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-6 sm:p-8 shadow-xl text-[#080A09]">
            {submitted ? (
              <div className="py-8 text-center space-y-4 font-mono text-xs">
                <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-[#082D2D]/10 text-[#082D2D] mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-2xl font-serif font-normal text-[#080A09]">
                  {usedFallback ? "Inquiry Formatted!" : "Inquiry Delivered!"}
                </h4>
                <p className="text-[#282B29] max-w-sm mx-auto leading-relaxed font-sans">
                  {usedFallback
                    ? "Your inquiry has been formatted into your default email client. Please click send to finalize."
                    : "Thank you — your inquiry has been routed to my queue. I will review your operational requirements and respond within 24 hours (GST)."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError(null);
                    setUsedFallback(false);
                    reset();
                  }}
                  className="text-[#082D2D] underline hover:text-black pt-2 cursor-pointer uppercase tracking-wider font-mono text-xs"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(8,45,45,0.1)]">
                  <span className="text-[#082D2D] font-bold uppercase tracking-widest">
                    [ INQUIRY_PAYLOAD ]
                  </span>
                  <span className="text-[#5C5953] text-[10px]">RESPONSE GUARANTEE &lt; 24H</span>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block uppercase tracking-widest text-[#5C5953] mb-1.5 text-[11px] font-semibold"
                  >
                    YOUR NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Tariq Al-Mansoor"
                    {...register("name")}
                    className={`w-full rounded-2xl bg-[#F3F0E8] border px-4 py-3 text-sm text-[#080A09] font-sans focus-ring transition-colors ${
                      errors.name ? "border-red-600" : "border-[rgba(8,45,45,0.14)]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs font-sans mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block uppercase tracking-widest text-[#5C5953] mb-1.5 text-[11px] font-semibold"
                  >
                    BUSINESS EMAIL *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tariq@company.com"
                    {...register("email")}
                    className={`w-full rounded-2xl bg-[#F3F0E8] border px-4 py-3 text-sm text-[#080A09] font-sans focus-ring transition-colors ${
                      errors.email ? "border-red-600" : "border-[rgba(8,45,45,0.14)]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs font-sans mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Service Requirement */}
                <div>
                  <label
                    htmlFor="service"
                    className="block uppercase tracking-widest text-[#5C5953] mb-1.5 text-[11px] font-semibold"
                  >
                    PRIMARY SERVICE REQUIREMENT *
                  </label>
                  <select
                    id="service"
                    {...register("service")}
                    className="w-full rounded-2xl bg-[#F3F0E8] border border-[rgba(8,45,45,0.14)] px-4 py-3 text-sm text-[#080A09] font-sans focus-ring"
                  >
                    {FORM_SERVICE_OPTIONS.map((svc) => (
                      <option key={svc} value={svc} className="bg-[#FAF8F2] text-[#080A09]">
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block uppercase tracking-widest text-[#5C5953] mb-1.5 text-[11px] font-semibold"
                  >
                    PROBLEM DESCRIPTION / GOALS *
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Describe what is taking too much time, disconnected tools, or project goals..."
                    {...register("message")}
                    className={`w-full rounded-2xl bg-[#F3F0E8] border px-4 py-3 text-sm text-[#080A09] font-sans resize-none focus-ring transition-colors ${
                      errors.message ? "border-red-600" : "border-[rgba(8,45,45,0.14)]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs font-sans mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#080A09] hover:bg-[#123E3D] px-6 py-4 font-mono text-xs uppercase tracking-wider font-bold text-[#F3F0E8] shadow-md active:scale-[0.98] transition-all cursor-pointer focus-ring disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting Inquiry Payload...</span>
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
    </SectionShell>
  );
}
