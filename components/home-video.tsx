"use client";

import React, { useEffect, useRef } from "react";

const HomeVideo = ({
  videoSrc,
  posterSrc,
  isPaused = false,
}: {
  videoSrc: string;
  posterSrc: string;
  isPaused?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Autoplay can be blocked by browser or device policy. The poster remains.
    });
  }, [isPaused]);

  return (
    <div className="relative h-full min-h-full w-full">
      <video
        ref={videoRef}
        poster={posterSrc}
        preload="metadata"
        muted
        playsInline
        loop
        autoPlay={!isPaused}
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src={`${videoSrc}.mp4`}
          type="video/mp4"
          media="(min-width: 1025px)"
        />
        <source
          src={`${videoSrc}-large.mp4`}
          type="video/mp4"
          media="(max-width: 1024px) and (min-width: 767px)"
        />
        <source
          src={`${videoSrc}-medium.mp4`}
          type="video/mp4"
          media="(max-width: 768px)"
        />
      </video>
    </div>
  );
};
export default HomeVideo;
