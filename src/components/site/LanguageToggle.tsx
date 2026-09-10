import { useLang } from "@/i18n/language";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cn(
        "border-gold/50 bg-card inline-flex items-center rounded-full border p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "te"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            "min-h-9 rounded-full px-3 text-sm font-semibold transition-colors",
            lang === code
              ? "gradient-saffron text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code === "en" ? "English" : "తెలుగు"}
        </button>
      ))}
    </div>
  );
}
