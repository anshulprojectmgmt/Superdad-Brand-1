import { type ChangeEvent, useEffect, useRef, useState } from "react";

type AudioSampleCtaProps = {
  title: string;
  src: string;
};

function formatTime(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function AudioSampleCta({ title, src }: AudioSampleCtaProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return undefined;
    }

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTime(0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration || 0);
      setCurrentTime(audioElement.currentTime || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime || 0);
      setDuration(audioElement.duration || 0);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("waiting", handleWaiting);
    audioElement.addEventListener("canplay", handleCanPlay);

    return () => {
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("waiting", handleWaiting);
      audioElement.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const handleTogglePlayback = async () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }

    try {
      setIsLoading(true);
      await audioRef.current.play();
    } catch {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);

    setCurrentTime(nextTime);

    if (!audioRef.current || !Number.isFinite(nextTime)) {
      return;
    }

    audioRef.current.currentTime = nextTime;
  };

  const progressPercent =
    duration > 0 ? `${Math.min(100, (currentTime / duration) * 100)}%` : "0%";

  return (
    <div className="flex w-full flex-col rounded-lg border border-orange-100 bg-[linear-gradient(180deg,_#fef6de_0%,_#fffaf0_100%)] px-4 py-3 text-left shadow-[0_12px_24px_rgba(13,35,74,0.08)]">
      <p className="mb-2 text-base font-bold leading-snug text-on-surface">{title}</p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleTogglePlayback}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_8px_18px_rgba(242,113,33,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          <span className="material-symbols-outlined text-[1.2rem] leading-none">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
            className="block h-1.5 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(90deg, #f27121 0%, #f27121 ${progressPercent}, rgba(245,158,11,0.18) ${progressPercent}, rgba(245,158,11,0.18) 100%)`,
            }}
            aria-label="Audio progress"
            disabled={!duration}
          />
          <div className="mt-1.5 text-[11px] font-medium text-on-surface-variant">
            {isLoading
              ? "Loading..."
              : `${formatTime(currentTime)} / ${formatTime(duration)}`}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
    </div>
  );
}
