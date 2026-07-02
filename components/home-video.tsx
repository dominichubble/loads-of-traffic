import React from "react";

const HomeVideo = ({
  videoSrc,
  posterSrc,
}: {
  videoSrc: string;
  posterSrc: string;
}) => {
  return (
    <div className="relative h-[50vh] w-full md:h-screen">
      <video
        poster={posterSrc}
        preload="auto"
        muted
        playsInline
        loop
        autoPlay
        className={`h-full w-full object-cover test-${0}`}
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
