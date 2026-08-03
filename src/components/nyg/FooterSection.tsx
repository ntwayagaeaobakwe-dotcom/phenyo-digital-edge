export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-surface-base border-t border-[--color-border-subtle] pt-16 pb-12 text-text-muted"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[--color-accent] flex items-center justify-center text-surface-base font-bold text-[9px] tracking-tight">
              NYG
            </span>
            <span className="font-mono text-xs text-text-primary tracking-wider uppercase">
              nyg digital
            </span>
          </div>
          <p className="mt-3 text-xs text-text-subtle max-w-sm">
            Dubai business-automation & web-systems practice. Lead follow-up, scheduling, and operational reporting without another hire.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs">
          <a
            href="mailto:contact@nygdigital.com"
            className="text-text-primary hover:text-[--color-accent] transition-colors focus-ring rounded-sm"
          >
            contact@nygdigital.com
          </a>
          <span className="text-text-subtle hidden sm:inline">•</span>
          <span className="text-text-subtle font-mono">
            Asia/Dubai (UTC+4)
          </span>
          <span className="text-text-subtle hidden sm:inline">•</span>
          <span className="text-text-subtle font-mono">
            © {currentYear} NYG Digital. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
