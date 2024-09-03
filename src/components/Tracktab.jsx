import React from 'react';

const Tracktab = ({ activeTab, setActiveTab }) => {
  return (
    <div className='flex font-bold gap-4 py-2'>
      <h1
        className={`cursor-pointer ${activeTab === 'for-you' ? 'text-white' : 'text-slate-500'}`}
        onClick={() => setActiveTab('for-you')}
      >
        For You
      </h1>
      <h1
        className={`cursor-pointer ${activeTab === 'top-tracks' ? 'text-white' : 'text-slate-500'}`}
        onClick={() => setActiveTab('top-tracks')}
      >
        Top Tracks
      </h1>
    </div>
  );
};

export default Tracktab;