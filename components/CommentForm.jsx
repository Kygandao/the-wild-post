import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentForm = ({ slug }) => {

  const [error, setError] = useState(false);
  const [localstorage, setLocalstorage] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const comment = useRef();
  const name = useRef();
  const email = useRef();
  const storeData = useRef();

  const handleSubmitComment = () => {
    setError(false);

    const { value: comment } = comment.current
    const { value: name } = name.current
    const { value: email } = email.current
    const { checked: storeData } = storeData.current
    
    if(!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug }
    
    if(storeData) {
      localstorage.setItem('name', name)
      localstorage.setItem('email', email)
    } else {
      localstorage.removeItem('name', name)
      localstorage.removeItem('email', email)
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMsg(true);
      
      setTimeout(() => {
        setShowSuccessMsg(false)
      }, 2000)
    })
  }

  return (
      <div className='p-8 pb-6 mb-4 bg-gray-200 rounded-lg shadow-xl'>
          <h3 className='pb-4 mb-4 text-lg font-semibold border-b'>Comments</h3>
          
          <div className='grid grid-cols-1 gap-4 mb-2'>
            <textarea ref={comment} className='w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200' placeholder='Comment' name='comment'/>
          </div>

          <div className='grid grid-cols-1 gap-4 mb-2 lg:grid-cols-2'>
            <input type='text' ref={name} className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200' placeholder='Name' name='name'/>
            
            <input type='text' ref={email} className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200' placeholder='Email' name='email'/>
          </div>
          
          <div className='grid grid-cols-1 gap-4 mb-2'>
            <div>
              <input ref={storeData} type='checkbox' id='storeData' name='storeData' value={true} className='mr-2'/>
              <label htmlFor='storeData' className='text-gray-700 cursor-pointer '>Remember Me</label>
            </div>
          </div>
          {error && <p className='text-sm text-red-500'>All fields are required!</p>}
          <div className='mt-4'>
            <button type='button' onClick={handleSubmitComment} className='inline-block px-4 py-2 transition bg-green-900 rounded-full cursor-pointer duration-400 ease hover:bg-green-900 hover:text-white bg-opacity-20'>
              Submit Comment
            </button>
            {showSuccessMsg && <p className='float-right mt-3 text-lg text-green-500'>Comment Submitted for Review!</p>}
          </div>
      </div>
  );
};

export default CommentForm;