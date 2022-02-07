import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if(obj) {
      if(obj.bold) {
        modifiedText = (<b key={index}>{text}</b>)
      }

      if(obj.italic) {
        modifiedText = (<em key={index}>{text}</em>)
      }

      if(obj.underline) {
        modifiedText = (<u key={index}>{text}</u>)
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className='mb-6 text-xl'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>

      case 'heading-four':
        return <h4 key={index} className='mb-5 text-lg'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>

      case 'paragraph':
        return <p key={index} className='mb-4 text-base'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>

      case 'image':
        return (
          <img src={obj.src} alt={obj.title} key={index} height={obj.height} width={obj.width} />
        );
        
      default:
        return modifiedText;
    }
  }
  
  return (
      <div className='pb-6 mb-4 bg-gray-200 rounded-lg shadow-xl lg:p-4'>
          <div className='relative mb-3 overflow-hidden shadow-xl'>
            <img src={post.featuredImage.url} alt={post.title} className='w-full h-full rounded-t-lg' />
          </div>

          <div className='px-2 lg:p-0'>
            <div className='flex items-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto'>
              <img src={post.author.photo.url} alt={post.author.name} className='w-8 h-8 align-middle rounded-full' />
              <p className='inline p-2 ml-2 text-lg text-gray-700 align-middle'>{post.author.name}</p>
            </div>

            <div className='flex items-center text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" className="inline w-6 h-6 mr-2 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className='p-2 align-middle'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </div>
            </div>
            
            <h1 className='m-4 text-2xl font-semibold'>
              {post.title}
            </h1>

            {post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

              return getContentFragment(index, children, typeObj, typeObj.type)
            })}
          </div>
          
      </div>
  );
};

export default PostDetail;
