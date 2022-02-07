import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])

  return (
    <div className='p-6 mb-4 bg-gray-200 rounded-lg shadow-xl'>
      <h3 className='pb-2 mb-4 text-lg font-semibold border-b'>
        Categories
      </h3>
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <div className='block pb-2 mb-2 cursor-pointer'>
            {category.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
