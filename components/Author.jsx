import React from 'react';
import Image from 'next/image'

const Author = ({ author }) => {
  return (
      <div className='relative p-6 mt-20 mb-10 text-center bg-green-900 rounded-lg shadow-xl bg-opacity-10'>

        <div className='absolute left-0 right-0 -top-10'>
          <Image src={author.photo.url} alt={author.name} unoptimized height='75px' width='75px' className='align-middle rounded-full '/>
          
        </div>

        <h3 className='my-4 text-xl text-black'>{author.name}</h3>
        <p className='text-base text-black'>{author.bio}</p>
        
      </div>
  );
};

export default Author;