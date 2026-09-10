import { festival } from "@/data/festival";
import { useLang } from "@/i18n/language";

export function AnnouncementBar() {
  const { t, b } = useLang();
  const slogan = `🙏 ${t("bappaMangalMorya")} 🙏`;
  const srpCommittee = b(festival.committeeName);
  const bujjiGaneshYouth = b(festival.committeeTitle);

  return (
    <div className="gradient-maroon text-maroon-foreground overflow-hidden border-b border-gold/30 select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2 text-sm tracking-wide font-medium">
        {[0, 1].map((i) => (
          <span key={i} aria-hidden={i === 1} className="inline-flex items-center">
            <span className="px-5 text-gold font-semibold tracking-wider">{slogan}</span>
            <span className="text-gold/80">✦</span>
            <span className="px-5 font-bold tracking-wide">{srpCommittee}</span>
            <span className="text-gold/80">✦</span>
            <span className="px-5 font-bold text-gold tracking-wide">{bujjiGaneshYouth}</span>
            <span className="text-gold/80">✦</span>
            <span className="px-5 text-gold font-semibold tracking-wider">{slogan}</span>
            <span className="text-gold/80">✦</span>
            <span className="px-5 font-bold tracking-wide">{srpCommittee}</span>
            <span className="text-gold/80">✦</span>
            <span className="px-5 font-bold text-gold tracking-wide">{bujjiGaneshYouth}</span>
            <span className="text-gold/80">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
