import React from 'react'
import Navbar from './Navbar'

const Feed = () => {
  return (
    <div className='flex flex-row w-full h-screen'>
      <div className='w-1/5 text-center h-full'><Navbar/></div>
      <div className='bg-gray-200 w-3/5 text-center h-full'>Mahammad</div>
      <div className='bg-gray-800 w-1/5 text-center h-full'>Hi</div>
    </div>
  )
}

export default Feed