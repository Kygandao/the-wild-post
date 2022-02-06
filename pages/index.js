import Head from 'next/head'
import { getPosts } from '../services'
import { PostCard } from '../components';

export default function Home({ posts }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>The Wild Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          {posts.map((post) => <PostCard post={post} key={post.title} />)}
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

