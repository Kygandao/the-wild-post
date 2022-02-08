import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'


const PostWidget = ({ categories, slug }) => {

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts(categories, slug).then((result) => setRelatedPosts(result))
    }
  }, [slug])

  return (
      <div className='p-6 mb-4 bg-gray-200 rounded-lg shadow-xl'>
          <h3 className='pb-2 mb-4 text-lg font-semibold border-b'>
            {slug ? 'Related Posts' : 'Recent Posts'}
          </h3>
          {relatedPosts.map((post) => (
            <div key={post.title} className='flex items-center w-full mb-4'>
              <div className='flex-none w-16'>
                <img src={post.featuredImage.url} alt={post.title} className='w-16 h-16 align-middle rounded-full'/>
              </div>

              <div className='flex-grow ml-4'>
              <Link href={`/post/${post.slug}`} key={post.title} >
                {post.title}
               </Link>
               <p className='text-xs'>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
               
              </div>
            </div>
          ))}
      </div>
  );
};

export default PostWidget;