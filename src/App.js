import React, { useState } from 'react';
import ProfileSection from './components/ProfileSection';
import Tracktab from './components/Tracktab';
import Search from './components/Search';
import Tracks from './components/Tracks';
import Player from './components/Player';

function App() {
  // Active tab state
  const [activeTab, setActiveTab] = useState('for-you');
  
  // List of songs and selected song state
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  
  // Accent color state for styling
  const [accent, setAccent] = useState(['bg-zinc-800']);
  
  // Current song index state
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  // Handle song selection
  const handleSelectedSong = (song, index) => {
    setSelectedSong(song);
    setCurrentSongIndex(index);    
    console.log(song.accent);
    console.log(accent);
  };

  // Play next song
  const playNextSong = () => {
    if (songs.length === 0 || currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setSelectedSong(songs[nextIndex]);
    setCurrentSongIndex(nextIndex);
  };

  // Play previous song
  const playPreviousSong = () => {
    if (songs.length === 0 || currentSongIndex === null) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setSelectedSong(songs[prevIndex]);
    setCurrentSongIndex(prevIndex);
  };
  
  return (
    <div className={`w-full h-[100vh] grid grid-cols-7 ${accent}`}>
      {/* Left sidebar */}
      <div className="col-span-1 flex flex-col justify-between">
        <ProfileSection />
        <div className="h-[24px] w-[24px] rounded-full bg-slate-600 mx-4 my-6"></div>
      </div>
      
      {/* Main content area */}
      <div className="col-span-2 flex flex-col gap-2">
        <Tracktab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <Search />
        </div>
        <div>
          <Tracks 
            activeTab={activeTab} 
            handleSelectedSong={handleSelectedSong} 
            setSongs={setSongs} 
            selectedSong={selectedSong} 
          />
        </div>
      </div>
      
      {/* Player controls */}
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
