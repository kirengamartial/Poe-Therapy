import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaVideo } from 'react-icons/fa';

const Card = ({ video, description, title }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);

  const handleCardClick = () => {
    setShowVideo(true);
    setPlaying(false); // Don't auto-play, just show the video
  };

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setShowVideo(false);
    setPlaying(false);
    setProgress(0);
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  const handlePlayPause = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTime / 100);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
      onClick={handleCardClick}
    >
      <FaVideo className="top-2 left-2" size={24} color="#FB954E" />
      <h3 className="text-gray-800 font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {showVideo && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={handleCloseVideo}
        >
          <div className="relative bg-black p-5 rounded-lg" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={handleCloseVideo}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="relative aspect-video">
              <ReactPlayer
                ref={playerRef}
                url={video.secure_url}
                playing={playing}
                controls={false}
                onProgress={handleProgress}
                width="100%"
                height="100%"
                className="react-player"
              />
            </div>
            <div className="mt-4 flex items-center">
              <button
                onClick={handlePlayPause}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="flex-grow h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #F97316 0%, #F97316 ${progress}%, #D1D5DB ${progress}%, #D1D5DB 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
