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
          <div className='inline-block w-full py-8 border-b border-black'>
              <div className='block md:float-left'>
                  <Link href='/'>
                      <div className='cursor-pointer'>
                          <img src='/images/wp.png' className='h-32'></img>
                      </div>
                  </Link>
              </div>

              <div className='hidden text-black md:float-left md:contents'>
                  {categories.map((category, index) => (
                      <Link key={index} href={`/category/${category.slug}`}>
                          <div className='mt-2 ml-4 font-semibold text-black align-middle cursor-pointer md:float-right'>
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
