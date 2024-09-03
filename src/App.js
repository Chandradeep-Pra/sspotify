import React, { useState, useEffect } from 'react';
import ProfileSection from './components/ProfileSection';
import Tracktab from './components/Tracktab';
import Search from './components/Search';
import Tracks from './components/Tracks';
import Player from './components/Player';

function App() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [accent, setAccent] = useState('#1f1f1f'); // Default color
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Log the accent color whenever it changes
  useEffect(() => {
  }, [accent]);

  const handleSelectedSong = (song, index) => {
    setSelectedSong(song);
    setCurrentSongIndex(index);
    console.log('Selected song:', song);
    
    // Update the accent color
    setAccent(song.accent);
  };

  const playNextSong = () => {
    if (songs.length === 0 || currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setSelectedSong(songs[nextIndex]);
    setCurrentSongIndex(nextIndex);
  };

  const playPreviousSong = () => {
    if (songs.length === 0 || currentSongIndex === null) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setSelectedSong(songs[prevIndex]);
    setCurrentSongIndex(prevIndex);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredSongs = songs.filter((song) => {
    const matchesQuery = song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'for-you') {
      return matchesQuery;
    } else if (activeTab === 'top-tracks') {
      return matchesQuery && song.top_track;
    }
    return matchesQuery;
  });

  return (
    <div 
      style={{ backgroundColor: accent,
        transition: 'background-color 1s ease'
       }}
      className="w-full h-screen grid grid-cols-7"
    >
      <div className="col-span-1 flex flex-col justify-between">
        <ProfileSection />
        <div className="h-[24px] w-[24px] rounded-full bg-slate-600 mx-4 my-6"></div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Tracktab activeTab={activeTab} setActiveTab={setActiveTab} />
        <Search onSearch={handleSearch} />
        <Tracks
          activeTab={activeTab}
          handleSelectedSong={handleSelectedSong}
          setSongs={setSongs}
          selectedSong={selectedSong}
          songs={filteredSongs}
        />
      </div>
      <div className="col-span-4">
        <Player
          selectedSong={selectedSong}
          onNextSong={playNextSong}
          onPrevSong={playPreviousSong}
        />
      </div>
    </div>
  );
}

export default App;
