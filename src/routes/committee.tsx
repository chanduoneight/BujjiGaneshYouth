import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { committeeMembers } from "@/data/members";
import { CinematicMemberSlider } from "@/components/committee/CinematicMemberSlider";
import { CommitteeGrid } from "@/components/committee/CommitteeGrid";
import { PageMusicPlayer } from "@/components/site/PageMusicPlayer";
import { FestivalParticles } from "@/components/effects/FestivalParticles";

export const Route = createFileRoute("/committee")({
  component: CommitteePage,
});

function CommitteePage() {
  const [sliderIndex, setSliderIndex] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#120608]">
      {/* Committee Section Background Music Player — Karuppu God Mode Entry Song */}
      <PageMusicPlayer audioSrc="/audio/karuppu-god-mode.mp3" />

      <FestivalParticles count={25} />

      {/* === PURE CINEMATIC COMMITTEE MEMBER SLIDER === */}
      <CinematicMemberSlider
        members={committeeMembers}
        currentIndex={sliderIndex}
        onIndexChange={setSliderIndex}
      />

      {/* === INTERACTIVE COMMITTEE MEMBERS GRID === */}
      <CommitteeGrid
        members={committeeMembers}
        onCardClick={(i) => {
          setSliderIndex(i);
          if (typeof document !== "undefined") {
            document.getElementById("cinematic-slider")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}

