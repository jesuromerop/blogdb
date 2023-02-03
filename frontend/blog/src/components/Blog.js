import React from 'react';
import Navbar from './Navbar';
import { getPosts } from '../api/crud';

function Blog() {
  return (
    <div>
      <Navbar />
      <div className="p-5 bg-secondary text-white">
        <h1 className="text-center fs-4">YEIIII</h1>
      </div>
    </div>
  );
}

export default Blog;