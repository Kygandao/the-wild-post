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
                      <span>
                          <img src='/images/twpWHITE.png' className='h-15'></img>
                      </span>
                  </Link>
              </div>

              <div className='float-right text-white'>
                  {categories.map((category, index) => (
                      <Link key={index} href={`/category/${category.slug}`}>
                          <div className='text-xl'>
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
