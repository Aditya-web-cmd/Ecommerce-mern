import React, { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFeaturedProducts(8);
        setProducts(data.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <section id="hero">
        <h4>Trade in offer</h4>
        <h1>Super value deals</h1>
        <p>Save more with coupons & up to 70% off</p>
        <button>Shop Now</button>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box"><img src="/img/features/f1.png" alt="f1" /><h6>Free Shipping</h6></div>
        <div className="fe-box"><img src="/img/features/f2.png" alt="f2" /><h6>Online Order</h6></div>
        <div className="fe-box"><img src="/img/features/f3.png" alt="f3" /><h6>Save Money</h6></div>
        <div className="fe-box"><img src="/img/features/f4.png" alt="f4" /><h6>Promotions</h6></div>
        <div className="fe-box"><img src="/img/features/f5.png" alt="f5" /><h6>Happy Sell</h6></div>
        <div className="fe-box"><img src="/img/features/f6.png" alt="f6" /><h6>24/7 Support</h6></div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="pro-container">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
