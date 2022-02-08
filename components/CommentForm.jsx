import React, { useState, useEffect} from 'react';
import { submitComment } from '../services';

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmitComment = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = '';
            formData.email = '';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMsg(true);
          setTimeout(() => {
            setShowSuccessMsg(false);
          }, 3000);
        }
      });
  };

  return (
      <div className='p-8 pb-6 mb-4 bg-gray-200 rounded-lg shadow-xl'>
          <h3 className='pb-4 mb-4 text-lg font-semibold border-b'>Comments</h3>
          
          <div className='grid grid-cols-1 gap-4 mb-2'>
            <textarea onChange={onInputChange} value={formData.comment} className='w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200' placeholder='Comment' name='comment'/>
          </div>

          <div className='grid grid-cols-1 gap-4 mb-2 lg:grid-cols-2'>
            <input type='text' onChange={onInputChange} value={formData.name} className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200' placeholder='Name' name='name'/>
            
            <input type='email' onChange={onInputChange} value={formData.email} className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200' placeholder='Email' name='email'/>
          </div>
          
          <div className='grid grid-cols-1 gap-4 mb-2'>
            <div>
              <input checked={formData.storeData} onChange={onInputChange} type='checkbox' id='storeData' name='storeData' value={true} className='mr-2'/>
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