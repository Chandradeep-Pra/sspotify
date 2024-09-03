import React, { useState, useRef, useEffect } from 'react';

// Format time in MM:SS format
const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const Seeker = ({ currentTime, duration, onSeek }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const seekerRef = useRef(null);
  const handleRef = useRef(null);

  // Update handle position based on current time
  useEffect(() => {
    if (seekerRef.current && handleRef.current) {
      const progressWidth = (currentTime / duration) * 100;
      handleRef.current.style.left = `${progressWidth}%`;
    }
  }, [currentTime, duration]);

  // Start dragging the seeker handle
  const handleMouseDown = (e) => {
    if (isHovered) {
      setIsDragging(true);
      handleSeek(e);
    }
  };

  // Stop dragging the seeker handle
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Move the seeker handle while dragging
  const handleMouseMove = (e) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  // Calculate and set new playback time based on mouse position
  const handleSeek = (e) => {
    const rect = seekerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(1, offsetX / rect.width)) * duration;
    onSeek(newTime);
  };

  return (
    <div className='w-full flex flex-col items-center mt-6'>
      <div
        ref={seekerRef}
        className='relative w-[80%] h-2 bg-white rounded-full cursor-pointer mt-2'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Progress bar */}
        <div
          className='absolute top-0 left-0 h-full bg-blue-500 rounded-full'
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        {/* Seeker handle */}
        <div
          ref={handleRef}
          className='absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-blue-500 rounded-full'
        />
      </div>
      <div className='flex justify-between w-[80%] text-white mt-1'>
        {/* Display current time and duration */}
        <span className='text-xs text-white/[0.6]'>{formatTime(currentTime)}</span>
        <span className='text-xs text-white/[0.6]'>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Seeker;
