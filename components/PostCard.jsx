import React from 'react';
import moment from 'moment';
import Link from 'next/link'

const PostCard = ({ post }) => {
  return (
      <div className='p-0 pb-12 mb-5 bg-gray-200 rounded-lg shadow-xl lg:p-8'>
          <div className='relative mb-6 overflow-hidden shadow-lg pb-80'>
            <img src={post.featuredImage.url} alt={post.title} className='absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg'/>
          </div>

          <h1 className='mb-8 text-3xl font-semibold text-center transition duration-500 cursor-pointer hover:text-red-600'>
            <Link href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </h1>

          <div className='items-center justify-center block w-full mb-8 text-center lg:flex'>
            <div className='flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto'>
              <img src={post.author.photo.url} alt={post.author.name} className='w-8 h-8 align-middle rounded-full' />
              <p className='inline ml-2 text-lg text-gray-700 align-middle'>{post.author.name}</p>
            </div>

            <div className='text-gray-600 font-base'>
              <svg xmlns="http://www.w3.org/2000/svg" className="inline w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </div>
            </div>
          </div>
          <p className='px-4 mb-4 text-center text-gray-700 lg:p-20'>
            {post.excerpt}
          </p>
          <div className='text-center'>
            <Link href={`/post/${post.slug}`}>
              <div className='inline-block px-2 transition duration-100 transform bg-green-900 rounded-full cursor-pointer bg-opacity-30 hover:-translate-y-1'>
                Continue Reading...
              </div>
            </Link>
          </div>
      </div>
  );
};

export default PostCard;
