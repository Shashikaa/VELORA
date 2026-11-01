"use client";
import { useEffect, useRef, useState } from "react";
export const words = {
  en: {
    invited: "YOU ARE LOVINGLY INVITED",
    open: "Open your invitation",
    scroll: "SCROLL TO OUR STORY",
    together: "Together with our families",
    wedding: "to celebrate the wedding of",
    date: "Until our forever begins",
    story: "Every little moment led to you.",
    day: "A day to remember.",
    gallery: "A little glimpse of our forever.",
    venue: "Meet us here.",
    rsvp: "Will you celebrate with us?",
    blessing: "With love, always.",
  },
  si: {
    invited: "සාදරයෙන් ඇරයුම් කරමු",
    open: "ආරාධනය විවෘත කරන්න",
    scroll: "අපේ කතාව",
    together: "දෙපවුලේ ආශිර්වාදයෙන්",
    wedding: "අපගේ විවාහ මංගල්‍යයට",
    date: "සුබ මොහොත එළඹෙන තුරු",
    story: "අපේ ආදර කතාව",
    day: "මංගල දිනය",
    gallery: "අපේ මතකයන්",
    venue: "උත්සව ස්ථානය",
    rsvp: "අප සමඟ එක්වෙනවාද?",
    blessing: "ආදරයෙන්, සැමදා.",
  },
  ta: {
    invited: "அன்புடன் அழைக்கிறோம்",
    open: "அழைப்பிதழைத் திறக்கவும்",
    scroll: "எங்கள் கதை",
    together: "எங்கள் குடும்பத்தினருடன்",
    wedding: "எங்கள் திருமணத்தை கொண்டாட",
    date: "நம் இனிய நாளை நோக்கி",
    story: "எங்கள் காதல் கதை",
    day: "திருமண நாள்",
    gallery: "எங்கள் நினைவுகள்",
    venue: "நிகழ்விடம்",
    rsvp: "எங்களுடன் இணைவீர்களா?",
    blessing: "என்றும் அன்புடன்.",
  },
};
export function Countdown({ date, time }: { date: string; time: string }) {
  const [values, setValues] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const tick = () => {
      const s = Math.max(
        0,
        Math.floor(
          (new Date(`${date}T${time}:00+05:30`).getTime() - Date.now()) / 1000,
        ),
      );
      setValues([
        Math.floor(s / 86400),
        Math.floor(s / 3600) % 24,
        Math.floor(s / 60) % 60,
        s % 60,
      ]);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [date, time]);
  return (
    <div className="countdown">
      {values.map((v, i) => (
        <div key={i}>
          <strong>{String(v).padStart(2, "0")}</strong>
          <span>{["DAYS", "HOURS", "MINUTES", "SECONDS"][i]}</span>
        </div>
      ))}
    </div>
  );
}
export function useMusic(musicUrl?: string, soundtrack?: "chimes" | "poruwa" | "romance" | "reception" | "silent") {
  const recording = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => {
    recording.current?.pause();
    recording.current = null;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    void audio.current?.close();
    audio.current = null;
    setPlaying(false);
  };
  useEffect(
    () => () => {
      recording.current?.pause();
      if (timer.current) clearInterval(timer.current);
      void audio.current?.close();
    },
    [],
  );
  useEffect(() => { stop(); }, [musicUrl, soundtrack]);
  const toggle = async () => {
    if (soundtrack === "silent") return;
    if (playing) {
      stop();
      return;
    }
    try {
      const validUrl = musicUrl && (/^https:\/\//.test(musicUrl) || /^\/audio\/[a-zA-Z0-9_./-]+$/.test(musicUrl) || /^data:audio\/(mpeg|mp3|wav|x-wav|ogg);base64,/.test(musicUrl));
      const source = validUrl ? musicUrl : soundtrack && soundtrack !== "chimes" ? `/audio/${soundtrack}.wav` : undefined;
      if (source) {
        const player = new Audio(source); player.loop = true; player.volume = .3;
        recording.current = player;
        player.onerror = () => stop();
        await player.play(); setPlaying(true); return;
      }
      const ctx = new AudioContext();
      audio.current = ctx;
      await ctx.resume();
      let step = 0;
      const notes = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
      const chime = () => {
        const o = ctx.createOscillator(),
          gain = ctx.createGain();
        o.type = "sine";
        o.frequency.value = notes[step++ % notes.length];
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);
        o.connect(gain);
        gain.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 2.5);
      };
      chime();
      timer.current = setInterval(chime, 650);
      setPlaying(true);
    } catch {
      stop();
    }
  };
  return { playing, toggle };
}
