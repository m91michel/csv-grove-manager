import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import blogPostsData from '../data/blogPosts.json';

const fetchBlogPost = async (slug) => {
  const post = blogPostsData.find(post => post.slug === slug);
  if (!post) throw new Error('Blog post not found');
  return post;
};

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPost(slug),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(post.date).toLocaleDateString()}</p>
      <div className="prose lg:prose-xl">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;