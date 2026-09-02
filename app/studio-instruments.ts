export type StudioCue = "hover" | "press" | "open" | "close" | "ready";

type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

let context: AudioContext | null = null;
let lastHover = 0;

function audioContext() {
  if (context) return context;
  const AudioContextClass = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!AudioContextClass) return null;
  context = new AudioContextClass();
  return context;
}

function tone(ctx: AudioContext, frequency: number, start: number, duration: number, level: number, destination: AudioNode, glide?: number) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  if (glide) oscillator.frequency.exponentialRampToValueAtTime(glide, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(level, start + .008);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain).connect(destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .03);
}

export function playStudioCue(cue: StudioCue, enabled = true) {
  if (!enabled || typeof window === "undefined") return;
  if (cue === "hover") {
    const now = performance.now();
    if (now - lastHover < 150) return;
    lastHover = now;
  }
  const ctx = audioContext();
  if (!ctx || navigator.userActivation?.hasBeenActive === false) return;
  const play = () => {
    const master = ctx.createGain();
    master.gain.value = .22;
    master.connect(ctx.destination);
    const at = ctx.currentTime;
    if (cue === "hover") tone(ctx, 430, at, .11, .025, master, 510);
    if (cue === "press") tone(ctx, 180, at, .07, .032, master, 155);
    if (cue === "open") {
      tone(ctx, 330, at, .18, .035, master, 440);
      tone(ctx, 495, at + .045, .2, .026, master, 660);
    }
    if (cue === "close") tone(ctx, 420, at, .16, .03, master, 240);
    if (cue === "ready") {
      tone(ctx, 440, at, .14, .035, master);
      tone(ctx, 554.37, at + .07, .16, .032, master);
      tone(ctx, 659.25, at + .14, .22, .035, master);
    }
    window.setTimeout(() => master.disconnect(), 700);
  };
  if (ctx.state === "suspended") void ctx.resume().then(play).catch(() => undefined);
  else play();
}

export type WeatherKind = "clear" | "cloud" | "rain" | "snow" | "fog";

export function weatherKind(code: number | null): WeatherKind {
  if (code === null || code <= 2) return "clear";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return "rain";
  return "cloud";
}

export const weatherLabels: Record<WeatherKind, string> = {
  clear: "ясно",
  cloud: "облачно",
  rain: "дождь",
  snow: "снег",
  fog: "туман",
};
