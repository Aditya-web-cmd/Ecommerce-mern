import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <section id="header">
      <Link to="/"><img src="/img/logo.png" alt="logo" /></Link>
      <div id="navbar-container">
        <ul id="navbar" className={mobileMenuOpen ? 'active' : ''}>
          <li><Link className="active" to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/wishlist">Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</Link></li>
              <li><Link to="/admin/add-product" style={{color:'#ff6b6b',fontWeight:'600'}}>➕ Add Product</Link></li>
              <li><button onClick={logout} style={{background:'none',border:'none',color:'#1a1a1a',cursor:'pointer',fontSize:'16px',fontWeight:600}}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
          <a id="close" href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }}><i className="fa-solid fa-xmark"></i></a>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link>
        {isAuthenticated && (
          <Link to="/wishlist">Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</Link>
        )}
        <i id="bar" className="fa-solid fa-outdent" onClick={() => setMobileMenuOpen(true)}></i>
      </div>
    </section>
  );
};

export default Header;
