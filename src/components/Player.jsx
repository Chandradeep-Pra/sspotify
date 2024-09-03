import React, { useEffect, useState, useRef } from 'react';
import Seeker from './Seeker'; 

const Player = ({ selectedSong, onNextSong, onPrevSong }) => {
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // New state for mute
  const audioRef = useRef(new Audio());

  // Default song information
  const defaultSong = {
    name: 'Select a Song',
    artist: 'Select a song',
    cover: 'https://c1.wallpaperflare.com/preview/638/495/740/earphones-headphones-black-music.jpg',
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (selectedSong) {
      audio.src = selectedSong.url;
      audio.load();
      audio.play();
      setIsPlaying(true);

      // Event listeners for audio updates
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [selectedSong]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : 1; // Apply volume based on mute status
  }, [isMuted]);

  // Update current time
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update duration
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Seek to a specific time
  const handleSeek = (newTime) => {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle play/pause
  const playPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className='flex h-full flex-col py-6 w-full justify-center items-center px-6'>
      {/* Display selected song details or default */}
      <h1 className='text-white font-bold text-2xl'>
        {selectedSong ? selectedSong.name : defaultSong.name}
      </h1>
      <h1 className='text-white/[0.6] text-xs'>
        {selectedSong ? selectedSong.artist : defaultSong.artist}
      </h1>
      <img
        className='w-[60vh] h-[60vh] bg-violet-700 mt-6 rounded-lg'
        src={selectedSong ? `https://cms.samespace.com/assets/${selectedSong.cover}` : defaultSong.cover}
        alt="Song Cover"
      />

      {/* Seeker component for song progress */}
      <Seeker
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />

      {/* Controls for previous, play/pause, and next */}
      <div className='flex w-[60%] justify-around mt-6 cursor-pointer'>
        <div className='h-[36px] w-[36px] rounded-full bg-slate-400 text-white text-center font-bold'>. . .</div>
        <div className='flex gap-2'>
          {/* Previous song button */}
          <div className='px-2 py-2 items-center justify-center' onClick={onPrevSong}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6 hover:fill-white">
              <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
            </svg>
          </div>

          {/* Play/Pause button */}
          <div className='h-[36px] w-[36px] rounded-full bg-white items-center justify-center flex' onClick={playPause}>
            {!isPlaying ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            }
          </div>

          {/* Next song button */}
          <div className='px-2 py-2 items-center justify-center' onClick={onNextSong}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6 hover:fill-white">
              <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
            </svg>
          </div>
        </div>

        {/* Sound button */}
        <div 
          className='h-[36px] w-[36px] rounded-full bg-slate-400 items-center justify-center flex cursor-pointer'
          onClick={toggleMute}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
              <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
              <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
