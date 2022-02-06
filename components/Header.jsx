import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { getCategories } from '../services'


const Header = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories)
        })
    }, [])
    
  return (
      <div className='container px-10 mx-auto mb-8'>
          <div>
              <div className='float-left'>
                  <Link href='/'>
                      <div className='cursor-pointer'>
                          <img src='/images/twp.png' className='h-28'></img>
                      </div>
                  </Link>
              </div>

              <div className='float-right text-black'>
                  {categories.map((category, index) => (
                      <Link key={index} href={`/category/${category.slug}`}>
                          <div className='text-xl cursor-pointer'>
                              {category.name}
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </div>
  );
};

export default Header;
