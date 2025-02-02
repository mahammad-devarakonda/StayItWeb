import React from 'react'
import Navbar from './Navbar'
const UserProfile = () => {
  return (

    <div className='flex flex-row w-full h-full'>
      <div className='w-1/5 text-center'><Navbar /></div>
      <div className='w-4/5 bg-amber-100 h-full overflow-y-auto'>
        <div class="flex flex-col items-center justify-center h-full bg-gray-100 p-6 gap-7">
          <div class="flex flex-row justify-evenly p-6 w-full">
            <div class="relative">
              <img class="rounded-full h-40 w-40 object-cover border-4 border-gray-700" src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png" alt="Avatar" />
            </div>

            <div>
              <h1 class="text-black text-2xl font-semibold mt-4">mahammd_7__</h1>
              <div class="text-black text-sm">11 posts • 143 followers • 182 following</div>
              <p class="text-black mt-2">Huzaif <span class="text-blue-400">👨‍⚕️</span></p>
              <p class="text-black mt-1">#doctor</p>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-1 p-6'>
            <img src='https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png' alt='Profile Imagse' />
            <img src='https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png' alt='Profile Imagse' />
            <img src='https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png' alt='Profile Imagse' />
            <img src='https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png' alt='Profile Imagse' />
            <img src='https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png' alt='Profile Imagse' />
          </div>
        </div>

      </div>
    </div>

  )
}

export default UserProfile