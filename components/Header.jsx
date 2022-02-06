import React, { useState, useEffect } from 'react';
import Link from 'next/link'


const Header = () => {
  return (
      <div className='container px-10 mx-auto mb-8'>
          <div>
              <div className='float-left'>
                  <Link href='/'>
                      <span className='text-4xl'>TWP</span>
                  </Link>
              </div>

              <div className='float-right'>
                  Categories Listed Here
              </div>
          </div>
      </div>
  );
};

export default Header;
