import React, { useState } from 'react';
import ProfileSection from './components/ProfileSection';
import Tracktab from './components/Tracktab';
import Search from './components/Search';
import Tracks from './components/Tracks';
import Player from './components/Player';

function App() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('for-you');
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [accent, setAccent] = useState(['bg-zinc-800']);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

 

  const handleSelectedSong = (song,index) => {
    setSelectedSong(song);
    setCurrentSongIndex(index);    
    console.log(song.accent);
    // setAccent(`bg-[${song.accent}]`);
    console.log(accent);
  };

  const playNextSong = () => {
    console.log(songs.length);
    
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
  

  return (
    <div className={`w-full h-[100vh] grid grid-cols-7 ${accent}`}>
      <div className="col-span-1 flex flex-col justify-between">
        <ProfileSection />
        <div className="h-[24px] w-[24px] rounded-full bg-slate-600 mx-4 my-6"></div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Tracktab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <Search />
        </div>
        <div>
          <Tracks activeTab={activeTab} handleSelectedSong={handleSelectedSong} setSongs={setSongs}  />
        </div>
      </div>
      <div className="col-span-4">
        <Player selectedSong={selectedSong} onNextSong={playNextSong}
          onPrevSong={playPreviousSong} />
      </div>
    </div>
  );
}

export default App;