import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Import your custom auth hook

export default function Miniprofile() {
  const { currentUser } = useAuth(); // Use your custom auth hook

  return (
    <div className="mt-4">
      <p className='font-serif text-lg ml-[7rem]'>CHAT-BOX</p>
      <div className='flex justify-between pt-4'>
        <div className="flex items-center">
          <div className="pt-2">
            <img 
              src={currentUser?.photoURL || '/default-profile.jpg'} // Use a default profile picture if not available
              alt=""
              className='rounded-full w-[2.8rem] h-[2.5rem]'
            />
          </div>
          <p className='pl-3 text-sm font-semibold'>{currentUser?.displayName || 'Guest'}</p> {/* Show 'Guest' if displayName is not available */}
        </div>
        <button className='text-sm font-semibold text-[#009f56]'>
          {currentUser ? "Signed In" : "Signed Out"}
        </button>
      </div>
    </div>
  );
}
