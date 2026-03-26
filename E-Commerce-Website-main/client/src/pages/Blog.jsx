import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: 'Fashion Trends 2025: What\'s Hot This Season',
      category: 'fashion',
      date: 'January 15, 2025',
      author: 'Sarah Johnson',
      image: '/img/blog/b1.jpg',
      excerpt: 'Discover the hottest fashion trends for 2025. From sustainable fashion to bold colors, learn what\'s dominating the runways.',
      content: 'Fashion is constantly evolving, and 2025 brings exciting new trends. Sustainable fashion continues to grow, with eco-friendly materials becoming mainstream. Bold, vibrant colors are replacing minimalism, and oversized silhouettes are making a comeback. Accessories are becoming statement pieces, and vintage fashion is being reimagined for modern wardrobes.'
    },
    {
      id: 2,
      title: 'How to Style Your Wardrobe for Every Season',
      category: 'style',
      date: 'January 10, 2025',
      author: 'Emma Davis',
      image: '/img/blog/b2.jpg',
      excerpt: 'Master the art of seasonal styling with our comprehensive guide. Learn how to transition your wardrobe smoothly.',
      content: 'Seasonal styling doesn\'t have to be complicated. Start with neutral basics that work year-round, then add seasonal pieces. In spring, opt for pastels and lightweight fabrics. Summer calls for breathable materials and bright colors. Fall is perfect for layering and earth tones. Winter requires warm textures and darker shades. Mix and match pieces to create versatile outfits.'
    },
    {
      id: 3,
      title: 'Sustainable Fashion: Making Ethical Choices',
      category: 'sustainability',
      date: 'January 5, 2025',
      author: 'Michael Chen',
      image: '/img/blog/b3.jpg',
      excerpt: 'Learn how to make ethical fashion choices without compromising on style. Explore sustainable brands and practices.',
      content: 'Sustainable fashion is more than a trend—it\'s a responsibility. Choose brands that prioritize ethical manufacturing and use eco-friendly materials. Buy less but choose better quality pieces that last longer. Support local designers and artisans. Consider second-hand shopping and clothing swaps. Every purchase is a vote for the kind of fashion industry you want to support.'
    },
    {
      id: 4,
      title: 'The Ultimate Guide to Accessorizing',
      category: 'style',
      date: 'December 28, 2024',
      author: 'Jessica Martinez',
      image: '/img/blog/b4.jpg',
      excerpt: 'Accessories can transform any outfit. Learn the rules of accessorizing and when to break them.',
      content: 'Accessories are the finishing touch that elevates any outfit. The key is balance—if your outfit is simple, go bold with accessories. If your outfit is busy, keep accessories minimal. Mix metals freely for a modern look. Layer delicate jewelry for a sophisticated appearance. Don\'t forget about bags and shoes—they\'re accessories too and can completely change an outfit\'s vibe.'
    },
    {
      id: 5,
      title: 'Celebrity Style Breakdown: Red Carpet Looks',
      category: 'fashion',
      date: 'December 20, 2024',
      author: 'Alex Thompson',
      image: '/img/blog/b5.jpg',
      excerpt: 'Analyze celebrity red carpet looks and learn how to recreate them on a budget.',
      content: 'Red carpet fashion provides endless inspiration. The key to recreating celebrity looks is understanding the silhouette and color palette. You don\'t need designer pieces—focus on fit and quality basics. Invest in tailoring to get that perfect fit. Mix high and low fashion pieces. Accessories can make or break a look, so choose them wisely. Remember, confidence is the best accessory.'
    },
    {
      id: 6,
      title: 'Wardrobe Essentials Every Person Should Own',
      category: 'style',
      date: 'December 15, 2024',
      author: 'Lisa Anderson',
      image: '/img/blog/b6.jpg',
      excerpt: 'Build a versatile wardrobe with these essential pieces that work for any occasion.',
      content: 'Every wardrobe needs foundational pieces. A white button-up shirt is versatile and timeless. Dark jeans work with almost everything. A blazer instantly elevates any outfit. A white t-shirt is a blank canvas for styling. Neutral sweaters provide warmth and sophistication. A little black dress is perfect for any occasion. Comfortable sneakers are essential for everyday wear. These basics form the foundation of a functional wardrobe.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'style', label: 'Style Tips' },
    { id: 'sustainability', label: 'Sustainability' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Fashion & Style Blog</h1>
        <p>Discover the latest trends, styling tips, and fashion insights</p>
      </div>

      <div className="blog-container">
        <div className="blog-sidebar">
          <div className="categories-widget">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="newsletter-widget">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest fashion tips and trends delivered to your inbox</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="blog-posts">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article key={post.id} className="blog-post">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-author">By {post.author}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <button 
                    className="read-more-btn"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="no-posts">No posts found in this category</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
