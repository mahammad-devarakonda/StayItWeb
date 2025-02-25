import React from 'react'
import Navbar from './Navbar'
import UserFeed from './UserFeed'

const Feed = () => {
  return (
    <div className="flex w-full h-screen">
  {/* Sidebar */}
  <aside className="hidden md:flex md:w-1/4 lg:w-1/5 h-full text-center bg-gray-100">
    <Navbar />
  </aside>

  {/* Main Content */}
  <main className="w-full md:w-3/4 lg:w-4/5 h-full overflow-y-auto text-center">
    <UserFeed />
  </main>
</div>

  )
}

export default Feed