import { useState, useEffect } from 'react';

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [audio] = useState(new Audio('/assets/background-music.mp3'));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [audio, volume]);

  useEffect(() => {
    if (isMuted) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay was prevented
        setIsMuted(true);
      });
    }
  }, [audio, isMuted]);

  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return { isMuted, volume, toggleMute, handleVolumeChange };
};