import Head from 'next/head'
import { getPosts } from '../services'
import { PostCard, PostWidget, Categories } from '../components';

export default function Home({ posts }) {
  return (
    <div className='container px-10 mx-auto mb-8'>
      <Head>
        <title>The Wild Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        <div className='col-span-1 lg:col-span-8'>
          {posts.map((post, index) => <PostCard post={post.node} key={index} />)}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  
  return {
    props: {
      posts
    }
  }
}

