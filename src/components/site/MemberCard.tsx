import { MessageCircle, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CommitteeMember } from "@/data/festival";
import { useLang } from "@/i18n/language";

export function MemberCard({ member }: { member: CommitteeMember }) {
  const { t, b } = useLang();
  const name = b(member.name);

  return (
    <article className="surface-card mandala-bg flex h-full flex-col items-center p-5 text-center transition-all hover:shadow-lift hover:-translate-y-1 group">
      <div className="border-gold/60 glow-halo h-24 w-24 overflow-hidden rounded-full border-2 shadow-gold relative">
        {/* Subtle glow animation on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {member.photo ? (
          <img
            src={member.photo}
            alt={name}
            loading="lazy"
            width={96}
            height={96}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="text-primary flex h-full w-full items-center justify-center">
            <User className="h-10 w-10" aria-hidden="true" />
          </span>
        )}
      </div>
      <h3 className="text-maroon font-display mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-primary text-sm font-semibold">{b(member.role)}</p>
      <p className="text-foreground/75 mt-2 flex-1 text-sm leading-relaxed">
        {b(member.description)}
      </p>
      {member.phone || member.whatsapp ? (
        <div className="mt-4 flex w-full flex-wrap justify-center gap-2">
          {member.phone ? (
            <Button asChild className="min-h-11 flex-1 rounded-full transition-all hover:-translate-y-0.5 active:scale-95">
              <a href={`tel:${member.phone}`}>
                <Phone className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {t("call")}
              </a>
            </Button>
          ) : null}
          {member.whatsapp ? (
            <Button asChild variant="outline" className="min-h-11 flex-1 rounded-full transition-all hover:-translate-y-0.5 active:scale-95">
              <a
                href={`https://wa.me/${member.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {t("whatsapp")}
              </a>
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
