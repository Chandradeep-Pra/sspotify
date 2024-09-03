import React from 'react'
import logo from '../logo.png'

const ProfileSection = () => {
  return (
    <div className='flex px-6 py-4 gap-1'>
        <img src={logo} alt="Spotify Logo" />
        <h1 className='font-bold font-sans text-white'>Spotify</h1>
    </div>
  )
}

export default ProfileSection