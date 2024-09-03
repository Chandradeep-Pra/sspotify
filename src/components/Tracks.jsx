import React, { useState, useEffect } from 'react'
import axios from 'axios';


const Tracks = ({handleSelectedSong, activeTab}) => {

    const [songs,setSongs]=useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    useEffect(() => {
      ;( async()=>{
        const response = await axios.get("https://cms.samespace.com/items/songs")
        // console.log(response.data.data);
        
        setSongs(response.data.data);
        
      })()
    },[]) 

    // Rendering songs based on filter
    useEffect(() => {
      if (activeTab === 'for-you') {
        setFilteredSongs(songs);
      } else if (activeTab === 'top-tracks') {
        setFilteredSongs(songs.filter((song) => song.top_track));
      }
    }, [activeTab, songs]);

    // console.log(songs.data)
    // for(var i=0; i<songs.data.length;i++){
    //   console.log(songs.data[i].name + " hello ");
      
    // }
    
      
  return (
    <div >
        <ul>
            {filteredSongs.map((song,index) => (
                <li key={index} className='py-2 px-2 flex justify-between items-center hover:bg-white/[0.6] cursor-pointer hover:rounded-lg' onClick={()=> handleSelectedSong(song)}>
                    <div className='flex gap-2'>
                        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt="Profile" className='h-[36px] w-[36px] rounded-full'/>
                        <div className='flex flex-col'>
                            <span className='text-white text-sm text-nowrap'>{song.name}</span>
                            <span className='text-white/[0.6] text-xs'>{song.artist}</span>
                        </div>
                        
                    </div>
                    <span className='text-white mr-2 text-sm'>{song.time}</span>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Tracks