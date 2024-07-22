import { useState, useEffect } from 'react';
import { addDoc, collection, query, orderBy } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { db } from '@/Firebase';
import { onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext'; // Import your custom auth hook
import Image from 'next/image';
import { IoIosSend } from 'react-icons/io';

export default function Suggestions() {
  const { currentUser } = useAuth(); // Use your custom auth hook
  const [Comments, setComments] = useState([]);
  const [Comment, setComment] = useState("");

  // Displaying comments
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'Chats'), orderBy('timestamp', 'desc')),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db]);

  // Send comment to DB
  const sendcomment = async (e) => {
    e.preventDefault();
    if (Comment.trim() === "") return; // Avoid sending empty comments
    await addDoc(collection(db, 'Chats'), {
      Comment: Comment,
      username: currentUser?.displayName,
      image: currentUser?.photoURL,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className='mt-4'>
      {/* Suggestions Header */}
      <div className="h-[30rem] scrollbar-thin scrollbar-thumb-[grey]">
        {Comments.map((chat) => (
          <div key={chat.id} className="flex items-center justify-between mt-5 h-[rem]">
            <div className="flex items-center">
              <div className="w-8 h-8">
                <img src={chat.data().image} alt="" className='rounded-full' />
              </div>
              <div className="ml-4">
                <p className='font-semibold text-sm'>{chat.data().username}</p>
                <p className='text-grey text-sm'>{chat.data().Comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Comment Input */}
      <div className='flex mt-4 gap-4'>
        <img src={currentUser?.photoURL} alt="" className='w-[2rem] h-[2rem]' />
        <input
          className='outline-0'
          type="text"
          placeholder='chat...'
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className='w-[10px] h-[10px] font-semibold text-[#0095f6]' onClick={sendcomment}>
          <IoIosSend className="w-5 h-5" />
        </button>
      </div>
      {/* Footer */}
      <div className="mt-[2.5rem]">
        <div className="flex text-sm text-[grey] gap-2">
          <p>About</p>
          <p>.</p>
          <p>Help</p>
          <p>.</p>
          <p>Privacy</p>
          <p>.</p>
          <p>Terms</p>
          <p>.</p>
          <p>Location</p>
          <p>.</p>
          <p>Security</p>
        </div>
        <p className="mt-4 text-sm text-[grey]">Copyright 2024 INSTAVIBE</p>
      </div>
    </div>
  );
}
