import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
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
      content: 'Fashion is constantly evolving, and 2025 brings exciting new trends. Sustainable fashion continues to grow, with eco-friendly materials becoming mainstream. Bold, vibrant colors are replacing minimalism, and oversized silhouettes are making a comeback. Accessories are becoming statement pieces, and vintage fashion is being reimagined for modern wardrobes. The fashion industry is also focusing on inclusivity and diversity, with more brands celebrating different body types and skin tones. Technology is playing a bigger role too, with virtual try-ons and AI-powered styling becoming more common. Whether you\'re a fashion enthusiast or just looking to update your wardrobe, 2025 offers something for everyone.'
    },
    {
      id: 2,
      title: 'How to Style Your Wardrobe for Every Season',
      category: 'style',
      date: 'January 10, 2025',
      author: 'Emma Davis',
      image: '/img/blog/b2.jpg',
      excerpt: 'Master the art of seasonal styling with our comprehensive guide. Learn how to transition your wardrobe smoothly.',
      content: 'Seasonal styling doesn\'t have to be complicated. Start with neutral basics that work year-round, then add seasonal pieces. In spring, opt for pastels and lightweight fabrics. Summer calls for breathable materials and bright colors. Fall is perfect for layering and earth tones. Winter requires warm textures and darker shades. Mix and match pieces to create versatile outfits. The key to successful seasonal styling is understanding your personal style and investing in quality basics. Don\'t be afraid to experiment with colors and patterns. Remember that comfort is just as important as style. By following these guidelines, you can create a wardrobe that works for every season and occasion.'
    },
    {
      id: 3,
      title: 'Sustainable Fashion: Making Ethical Choices',
      category: 'sustainability',
      date: 'January 5, 2025',
      author: 'Michael Chen',
      image: '/img/blog/b3.jpg',
      excerpt: 'Learn how to make ethical fashion choices without compromising on style. Explore sustainable brands and practices.',
      content: 'Sustainable fashion is more than a trend—it\'s a responsibility. Choose brands that prioritize ethical manufacturing and use eco-friendly materials. Buy less but choose better quality pieces that last longer. Support local designers and artisans. Consider second-hand shopping and clothing swaps. Every purchase is a vote for the kind of fashion industry you want to support. The environmental impact of fast fashion is significant, with millions of tons of clothing ending up in landfills each year. By making conscious choices, you can reduce your carbon footprint and support fair labor practices. Look for certifications like Fair Trade, GOTS, and B Corp when shopping. Remember that sustainable fashion doesn\'t mean sacrificing style—many eco-friendly brands offer trendy and high-quality pieces.'
    },
    {
      id: 4,
      title: 'The Ultimate Guide to Accessorizing',
      category: 'style',
      date: 'December 28, 2024',
      author: 'Jessica Martinez',
      image: '/img/blog/b4.jpg',
      excerpt: 'Accessories can transform any outfit. Learn the rules of accessorizing and when to break them.',
      content: 'Accessories are the finishing touch that elevates any outfit. The key is balance—if your outfit is simple, go bold with accessories. If your outfit is busy, keep accessories minimal. Mix metals freely for a modern look. Layer delicate jewelry for a sophisticated appearance. Don\'t forget about bags and shoes—they\'re accessories too and can completely change an outfit\'s vibe. Invest in timeless pieces like a classic watch, simple gold necklace, and quality leather bag. These will work with almost any outfit and never go out of style. Don\'t be afraid to experiment with statement pieces like bold earrings or colorful scarves. The right accessories can make a basic outfit look expensive and put-together. Remember that less is often more—choose quality over quantity.'
    },
    {
      id: 5,
      title: 'Celebrity Style Breakdown: Red Carpet Looks',
      category: 'fashion',
      date: 'December 20, 2024',
      author: 'Alex Thompson',
      image: '/img/blog/b5.jpg',
      excerpt: 'Analyze celebrity red carpet looks and learn how to recreate them on a budget.',
      content: 'Red carpet fashion provides endless inspiration. The key to recreating celebrity looks is understanding the silhouette and color palette. You don\'t need designer pieces—focus on fit and quality basics. Invest in tailoring to get that perfect fit. Mix high and low fashion pieces. Accessories can make or break a look, so choose them wisely. Remember, confidence is the best accessory. Study the details of celebrity outfits—the way fabrics drape, how colors are combined, and how accessories are styled. Look for similar pieces at affordable retailers. Don\'t be afraid to put your own spin on celebrity looks to match your personal style. The goal is to feel confident and comfortable in what you\'re wearing.'
    },
    {
      id: 6,
      title: 'Wardrobe Essentials Every Person Should Own',
      category: 'style',
      date: 'December 15, 2024',
      author: 'Lisa Anderson',
      image: '/img/blog/b6.jpg',
      excerpt: 'Build a versatile wardrobe with these essential pieces that work for any occasion.',
      content: 'Every wardrobe needs foundational pieces. A white button-up shirt is versatile and timeless. Dark jeans work with almost everything. A blazer instantly elevates any outfit. A white t-shirt is a blank canvas for styling. Neutral sweaters provide warmth and sophistication. A little black dress is perfect for any occasion. Comfortable sneakers are essential for everyday wear. These basics form the foundation of a functional wardrobe. Invest in quality versions of these essentials—they\'ll last longer and look better. Choose neutral colors like black, white, navy, and gray for maximum versatility. Once you have these basics, you can build your wardrobe with more colorful and trendy pieces. The key is having pieces that work together and can be mixed and matched easily.'
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="post-not-found">
            <h2>Post not found</h2>
            <button onClick={() => navigate('/blog')} className="back-btn">Back to Blog</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <button onClick={() => navigate('/blog')} className="back-btn">← Back to Blog</button>
        
        <article className="blog-detail-article">
          <div className="detail-header">
            <h1>{post.title}</h1>
            <div className="detail-meta">
              <span className="detail-date">{post.date}</span>
              <span className="detail-author">By {post.author}</span>
              <span className="detail-category">{post.category}</span>
            </div>
          </div>

          <div className="detail-image">
            <img src={post.image} alt={post.title} />
          </div>

          <div className="detail-content">
            <p>{post.content}</p>
          </div>

          <div className="detail-footer">
            <button onClick={() => navigate('/blog')} className="back-btn">Back to Blog</button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
