import React, { useRef, useEffect, useState } from 'react';

/**
 * Bulletproof auto-looping video player.
 * Eliminates hardware decoder starvation and race-condition blank screens by using
 * a single optimized video element with auto-recovery for stalls, pauses, and decoder drops.
 */
export const SmoothLoopVideo = ({
  src,
  className = '',
  style = {},
}) => {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let retryTimeout;

    const attemptPlay = () => {
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Retry silently if browser delayed playback
            retryTimeout = setTimeout(() => {
              if (video && video.paused) {
                video.play().catch(() => {});
              }
            }, 400);
          });
        }
      }
    };

    const handleCanPlay = () => {
      setIsReady(true);
      attemptPlay();
    };

    const handleEnded = () => {
      // Guarantee loop if browser loop attribute misses
      if (video) {
        video.currentTime = 0;
        attemptPlay();
      }
    };

    const handlePause = () => {
      // Re-trigger playback if paused unexpectedly
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    const handleError = () => {
      // Self-heal: reload video source after a short backoff if hardware decoder hiccups
      retryTimeout = setTimeout(() => {
        if (video) {
          video.load();
          attemptPlay();
        }
      }, 600);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video && video.paused) {
        attemptPlay();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial attempt
    attemptPlay();

    return () => {
      clearTimeout(retryTimeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [src]);

  return (
    <div
      style={style}
      className={`relative w-full h-full overflow-hidden select-none bg-black/30 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
          isReady ? 'opacity-100' : 'opacity-85'
        }`}
      />
    </div>
  );
};
