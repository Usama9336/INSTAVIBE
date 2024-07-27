import React from 'react';
import { FaHome, FaSearch, FaPlusCircle, FaHeart, FaUser } from 'react-icons/fa';
import insta from '@/assets/instagram.png';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../Firebase';

export default function Sidebar() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/'); // Redirect to home page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className='fixed top-0 left-0 h-full w-60 flex flex-col bg-white border-r p-4 '>
      {/* Logo */}
      <div className='flex items-center justify-center h-13'>
        <img src={insta.src} alt='Instagram' className='h-10' />
      </div>

      {/* Navigation Icons and Labels */}
      <nav className='flex flex-col mt-12 space-y-4'>
        <a href='#' className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded'>
          <FaHome className='h-6 w-6 text-gray-700' />
          <span className='text-gray-700'>Home</span>
        </a>
        <a href='#' className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded'>
          <FaSearch className='h-6 w-6 text-gray-700' />
          <span className='text-gray-700'>Explore</span>
        </a>
        <a href='#' className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded'>
          <FaPlusCircle className='h-6 w-6 text-gray-700' />
          <span className='text-gray-700'>Add</span>
        </a>
        <a href='#' className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded'>
          <FaHeart className='h-6 w-6 text-gray-700' />
          <span className='text-gray-700'>Likes</span>
        </a>
        <a href='#' className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded'>
          <FaUser className='h-6 w-6 text-gray-700' />
          <span className='text-gray-700'>Profile</span>
        </a>
      </nav>

      {/* Profile Section */}
      <div className='flex items-center justify-center h-16 mt-[11rem] gap-[0.5rem]'>
        {currentUser && (
          <>
            <img src={currentUser.photoURL} alt='Profile' className='h-10 w-10 rounded-full' />
            <p className='text-[15px] font-bold text-[grey]'>{currentUser.displayName}</p>
          </>
        )}
      </div>
      <div
        className='flex items-center text-center justify-center cursor-pointer text-[#0095f6] font-semibold whitespace-nowrap hover:scale-[90%] duration-500'
        onClick={handleSignOut}
      >
        Sign out
      </div>
    </div>
  );
}
