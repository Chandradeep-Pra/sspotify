import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format the time
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const Tracks = ({ handleSelectedSong, activeTab, setSongs, selectedSong, songs }) => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // Filter songs based on the active tab
    if (activeTab === 'for-you') {
      setFilteredSongs(songs);
    } else if (activeTab === 'top-tracks') {
      setFilteredSongs(songs.filter((song) => song.top_track));
    }
  }, [activeTab, songs]);

  useEffect(() => {
    // Fetch songs from the API on component mount
    (async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        const fetchedSongs = response.data.data;

        // Load duration for each song
        const songsWithDuration = await Promise.all(
          fetchedSongs.map(async (song) => {
            const audio = new Audio(song.url);
            await new Promise((resolve) => {
              audio.onloadedmetadata = () => {
                resolve();
              };
            });
            return {
              ...song,
              duration: audio.duration,
            };
          })
        );

        setSongs(songsWithDuration);
        setFilteredSongs(songsWithDuration);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    })();
  }, [setSongs]);

  const handleSongClick = (index) => {
    setSelectedIndex(index);
    handleSelectedSong(filteredSongs[index], index);
  };

  return (
    <div>
      <ul>
        {filteredSongs.map((song, index) => (
          <li
            key={index}
            className={`py-2 px-2 my-2 flex justify-between items-center hover:bg-white/[0.6] cursor-pointer hover:rounded-lg ${
              selectedIndex === index ? 'bg-white/[0.6] rounded-lg' : ''
            }`}
            onClick={() => handleSongClick(index)}
          >
            <div className='flex gap-2'>
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt="Song Cover"
                className='h-[36px] w-[36px] rounded-full'
              />
              <div className='flex flex-col'>
                <span className='text-white text-sm'>{song.name}</span>
                <span className='text-white/[0.6] text-xs'>{song.artist}</span>
              </div>
            </div>
            <span className='text-white/[0.6] mr-2 text-xs'>{formatTime(song.duration)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracks;
