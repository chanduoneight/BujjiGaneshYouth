import React, { useEffect, useRef } from "react";

export interface RealtimeAudioWaveformProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  className?: string;
  height?: number;
  barColor?: string;
  barWidth?: number;
  barGap?: number;
  smoothing?: number;
}

export function RealtimeAudioWaveform({
  analyser,
  isPlaying,
  className = "",
  height = 120,
  barColor = "#FFFFFF",
  barWidth = 1.8,
  barGap = 2.2,
  smoothing = 0.8,
}: RealtimeAudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const smoothedAmplitudesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width || canvas.parentElement?.clientWidth || window.innerWidth;
      const displayHeight = height;

      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);

      // Re-allocate smoothing buffer if width changes
      const slot = barWidth + barGap;
      const totalBars = Math.floor(displayWidth / slot);
      if (!smoothedAmplitudesRef.current || smoothedAmplitudesRef.current.length !== totalBars) {
        smoothedAmplitudesRef.current = new Float32Array(totalBars);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let freqData: Uint8Array<ArrayBuffer> | null = null;
    if (analyser) {
      freqData = new Uint8Array(analyser.frequencyBinCount);
    }

    const render = (timestamp: number) => {
      const displayWidth = canvas.width / dpr;
      const displayHeight = canvas.height / dpr;
      const centerY = displayHeight / 2;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const slot = barWidth + barGap;
      const numBars = Math.floor(displayWidth / slot);
      const startOffset = (displayWidth - numBars * slot) / 2;

      if (!smoothedAmplitudesRef.current || smoothedAmplitudesRef.current.length !== numBars) {
        smoothedAmplitudesRef.current = new Float32Array(numBars);
      }
      const smoothed = smoothedAmplitudesRef.current;

      let hasActiveAudio = false;
      if (analyser && isPlaying) {
        if (!freqData || freqData.length !== analyser.frequencyBinCount) {
          freqData = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(freqData);
        hasActiveAudio = true;
      }

      const binCount = freqData ? freqData.length : 0;
      // Focus on lower to mid frequencies where energy and beats live (first 65% of spectrum)
      const usableBins = Math.floor(binCount * 0.65);

      ctx.fillStyle = barColor;
      const timeSec = timestamp * 0.001;

      // 4 distinct transient pulses firing at staggered rhythmic intervals
      const pulse1 = Math.pow(Math.max(0, Math.sin(timeSec * 2.4)), 8) * (0.8 + 0.2 * Math.sin(timeSec * 5.0));
      const pulse2 = Math.pow(Math.max(0, Math.sin(timeSec * 3.2 + 1.8)), 10);
      const pulse3 = Math.pow(Math.max(0, Math.sin(timeSec * 1.9 + 3.2)), 8);
      const pulse4 = Math.pow(Math.max(0, Math.sin(timeSec * 4.2 + 0.9)), 12);

      // Single high-energy transient needle trigger (sharp beat hit)
      const needleTrigger = Math.pow(Math.max(0, Math.sin(timeSec * 1.8)), 14);

      for (let i = 0; i < numBars; i++) {
        const x = startOffset + i * slot;
        const normPos = i / (numBars - 1 || 1); // 0.0 at left, 1.0 at right

        // Discrete, isolated burst envelopes (tight width with clean flat baseline between them)
        const env1 = Math.exp(-Math.pow((normPos - 0.16) * 26.0, 2)) * pulse1;
        const env2 = Math.exp(-Math.pow((normPos - 0.32) * 22.0, 2)) * pulse2;
        const env3 = Math.exp(-Math.pow((normPos - 0.48) * 28.0, 2)) * pulse3;
        const env4 = Math.exp(-Math.pow((normPos - 0.64) * 32.0, 2)) * pulse4;

        // Soundwave tooth texture within bursts
        const tooth = 0.35 + 0.65 * Math.abs(Math.sin(i * 2.2 + timeSec * 12.0));

        // Sharp isolated needle spikes (like in reference video)
        const needleBar1 = Math.exp(-Math.pow(i - Math.floor(numBars * 0.16), 2) / 1.4) * (needleTrigger * 0.85 + pulse1 * 0.5);
        const needleBar2 = Math.exp(-Math.pow(i - Math.floor(numBars * 0.32), 2) / 1.4) * (pulse2 * 0.9 + needleTrigger * 0.4);
        const needleBar3 = Math.exp(-Math.pow(i - Math.floor(numBars * 0.48), 2) / 1.4) * (pulse3 * 0.75);

        const clusterSum = (env1 * 1.1 + env2 * 1.35 + env3 * 0.9 + env4 * 0.6) * tooth;
        const ambientAmp = Math.max(0, clusterSum + needleBar1 + needleBar2 + needleBar3);

        // Resting baseline is a clean flat dotted line (0.015)
        let targetAmp = 0.015 + ambientAmp * 0.88;

        if (hasActiveAudio && freqData && usableBins > 0) {
          // Live audio reactive mapping with discrete cluster dynamics
          const freqDist = Math.min(1.0, normPos * 1.35);
          const binIndex = Math.min(usableBins - 1, Math.max(0, Math.floor(freqDist * usableBins)));
          const rawEnergy = freqData[binIndex] / 255;

          if (rawEnergy > 0.08) {
            const bandMod = Math.pow(rawEnergy, 1.4) * 1.45;
            const combTooth = 0.3 + 0.7 * Math.abs(Math.sin(i * 2.0 + timeSec * 8.0));
            const liveSpike = (rawEnergy > 0.6 && (i % 8 === 0 || i % 13 === 0)) ? 0.38 : 0;
            const envelopeCut = Math.max(0, 1.0 - Math.pow(normPos, 1.3));
            targetAmp = 0.015 + (bandMod * combTooth + liveSpike) * envelopeCut;
          } else {
            targetAmp = 0.015;
          }
        }

        // Fast snappy attack and fast release so spikes pop and decay cleanly
        const currentAmp = smoothed[i] || 0.015;
        const isRising = targetAmp > currentAmp;
        const smoothFactor = isRising ? 0.22 : 0.68;
        const newAmp = currentAmp * smoothFactor + targetAmp * (1 - smoothFactor);
        smoothed[i] = newAmp;

        // Symmetrical mirrored bar height centered around the horizontal axis
        const maxBarHeight = displayHeight * 0.92;
        const barHeight = Math.max(1.8, newAmp * maxBarHeight);
        const topY = centerY - barHeight / 2;

        // Draw crisp vertical pure white bar
        ctx.beginPath();
        ctx.roundRect(x, topY, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, isPlaying, height, barColor, barWidth, barGap, smoothing]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full pointer-events-none select-none ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
