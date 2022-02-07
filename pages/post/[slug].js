import React from 'react';
import { getPosts, getPostDetails } from '../../services'
import { PostDetail, Categories, PostWidget, Author, Comments, CommentForm } from '../../components'

const PostDetails = ({ post}) => {
  return (
      <div className='container px-5 mx-auto mb-4'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentForm slug={post.slug}/>
                <Comments slug={post.slug}/>
            </div>
            
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-4'>
                    <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
                    <Categories />
                </div>
            </div>
          </div>
      </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
    const result = await getPostDetails(params.slug)
    
    return {
      props: {
        post: result
      }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
        fallback: false
    }
}