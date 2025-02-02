import React from 'react'
import Navbar from './Navbar'
import UserFeed from './UserFeed'

const Feed = () => {
  return (
    <div className='flex flex-row w-full h-screen'>
      <div className='w-1/5 text-center h-full'><Navbar/></div>
      <div className='w-4/5 text-center h-screen overflow-y-auto'><UserFeed/></div>
    </div>
  )
}

export default Feed