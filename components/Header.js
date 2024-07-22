import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import instagram from '@/assets/instagram.png';
import homeone from '@/assets/home.png';
import send from '@/assets/send.png';
import heart from '@/assets/heart.png';
import video from '@/assets/video.png';
import {CgAddR, CgInstagram, CgProfile} from "react-icons/cg"
import heart1 from '@/assets/heart1.png';
import bookmark from '@/assets/bookmark.png';
import { Modalstate } from '@/atoms/Modalstate';
import { useRecoilState } from 'recoil';
import { TfiSearch } from "react-icons/tfi";
import { useAuth } from '@/context/AuthContext';
import { orderBy, onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '@/Firebase';
import { Modalstatestory } from '@/atoms/Modalstatestory';
import { useRouter } from "next/router";
import { Modalstatechat } from '@/atoms/Modalstatechat';
import { Modalstatevideo } from '@/atoms/Modalstatevideo';

export default function Header() {
  const [open, setopen] = useRecoilState(Modalstate);
  const [openchat, setopenchat] = useRecoilState(Modalstatechat);
  const [openvideo, setopenvideo] = useRecoilState(Modalstatevideo);
  const [Comments, setComments] = useState([]);
  const router = useRouter();

  // Use the custom auth hook
  const { currentUser, signOut } = useAuth();

  // Displaying comments
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'Chats'), orderBy('timestamp', 'desc')),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db]);

  const len = Comments.length;

  return (
    <div className='border-b shadow-sm bg-white sticky top-0 z-10'>
      <div className='flex justify-between items-center h-18 px-2 sm:max-w-5xl mx-auto'>
        {/* Left */}
        <div className='flex'>
          <div className='p-2 w-[10rem] sm:w-[13rem] sm:p-2 sm:h-full sm:flex'>
            <Image priority="true" alt="" src={instagram} width='30%' height='30%' />
          </div>
        </div>

        {/* Middle */}
        <div className='hidden w-[15.2rem] sm:flex relative mx-2'>
          <div className='absolute pl-[4px] w-full h-full flex items-center'>
            <TfiSearch className='w-[1.1rem] h-[3rem]' />
          </div>
          <input type="text" placeholder='Search' className='h-9 w-full rounded-md bg-[#efefef] pl-7 outline-0 border-[1px]' />
        </div>

        {/* Right */}
        <div className='flex ml-[-4px] space-x-4 sm:flex sm:space-x-5'>
          <div className='hidden sm:flex'>
            <Image priority="true" alt="" src={homeone} className="w-[1.6rem] h-[1.6rem] cursor-pointer hover:scale-[80%] duration-500" />
          </div>
          <div className='btn flex relative' onClick={() => setopenchat(!openchat)}>
            <Image priority="true" alt="" src={send} className="hover:scale-[80%] duration-500" />
            <div className='absolute flex top-2 left-3.5 items-center justify-center bg-red-500 text-[white] rounded-full w-4 h-4 text-xs'>{len}</div>
          </div>
          <div className='cursor-pointer flex' onClick={() => setopen(!open)}>
            <CgAddR className='w-[1.7rem] h-[1.8rem] hover:scale-[80%] duration-500' />
          </div>
          <div className='btn mt-[3px] hidden sm:flex' onClick={() => setopenvideo(!openvideo)}>
            <Image priority="true" alt="" src={video} className="hover:scale-[80%] duration-500" />
          </div>
          <div className='btn mt-[3px] hidden sm:flex'>
            <Image priority="true" alt="" src={heart} className="hover:scale-[80%] duration-500" />
          </div>
          <div className='flex'>
            <div className='btn mr-2 mt-[3px] ml-[-7px]'>
              <img src={currentUser?.photoURL} alt="" className='rounded-full hover:scale-[80%] duration-500' />
            </div>
            <div className='cursor-pointer text-[#0095f6] font-semibold whitespace-nowrap hover:scale-[80%] duration-500' onClick={() => {
              router.push("/"); // Redirect after sign out
            }}>
              Sign out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
