import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { committeeMembers } from "@/data/members";
import { CinematicMemberSlider } from "@/components/committee/CinematicMemberSlider";
import { CommitteeSoundtrackVisualizer } from "@/components/committee/CommitteeSoundtrackVisualizer";
import { CommitteeGrid } from "@/components/committee/CommitteeGrid";
import { FestivalParticles } from "@/components/effects/FestivalParticles";

export const Route = createFileRoute("/committee")({
  component: CommitteePage,
});

function CommitteePage() {
  const [sliderIndex, setSliderIndex] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#120608]">
      <FestivalParticles count={25} />

      {/* === PURE CINEMATIC COMMITTEE MEMBER SLIDER === */}
      <CinematicMemberSlider
        members={committeeMembers}
        currentIndex={sliderIndex}
        onIndexChange={setSliderIndex}
      />

      {/* === REAL-TIME SOUNDTRACK WAVEFORM VISUALIZER (IN THE GAP) === */}
      <CommitteeSoundtrackVisualizer
        audioSrc="/audio/karuppu-god-mode.mp3"
        trackTitle="Karuppu — God Mode Entry BGM"
        trackSubtitle="Sai Abhyankar • SRP Committee Official Anthem 2026"
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

