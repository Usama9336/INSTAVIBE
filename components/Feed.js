import React from 'react';
import Stories from './Stories';
import Posts from './Posts';
import Miniprofile from './Miniprofile';
import Suggestions from './Suggestions';
import Sidebar from './Sidebar';

export default function Feed() {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar className=""/>
      <div className='flex max-w-[50%] mx-auto '>
        <section className='max-w-lg mx-auto w-full'>
          {/* Stories */}
          <Stories />
          {/* Posts */}
          <Posts />
        </section>
        <aside className='max-w-xs w-full hidden lg:block ml-6'>
          {/* Mini Profile */}
          <Miniprofile />
          {/* Suggestions */}
          <Suggestions />
        </aside>
      </div>
    </div>
  );
}
