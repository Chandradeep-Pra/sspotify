import React, { useState } from 'react';
import ProfileSection from './components/ProfileSection';
import Tracktab from './components/Tracktab';
import Search from './components/Search';
import Tracks from './components/Tracks';
import Player from './components/Player';

function App() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('for-you');
  const [selectedSong, setSelectedSong] = useState(null);
  const [accent, setAccent] = useState(['bg-zinc-800']);

  const handleSelectedSong = (song) => {
    setSelectedSong(song);
    console.log(song.accent);
    setAccent(`bg-[${song.accent}]`);
    console.log(accent);
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
          <Tracks activeTab={activeTab} handleSelectedSong={handleSelectedSong} />
        </div>
      </div>
      <div className="col-span-4">
        <Player selectedSong={selectedSong} />
      </div>
    </div>
  );
}

export default App;