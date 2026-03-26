import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="section-p1">
        <h2>Your cart is empty</h2>
        <Link to="/shop"><button className="normal">Continue Shopping</button></Link>
      </section>
    );
  }

  return (
    <section id="cart" className="section-p1">
      <table width="100%">
        <thead>
          <tr>
            <td>Remove</td>
            <td>Image</td>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Subtotal</td>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td><button onClick={() => removeFromCart(item._id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px'}}>×</button></td>
              <td><img src={item.product?.images[0] || '/img/products/f1.jpg'} alt={item.product?.name} /></td>
              <td>{item.product?.name} {item.size && `(${item.size})`}</td>
              <td>${item.price}</td>
              <td><input type="number" value={item.quantity} min="1" onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))} /></td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section id="cart-add">
        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tr><td>Cart Subtotal</td><td>${getCartTotal().toFixed(2)}</td></tr>
            <tr><td>Shipping</td><td>$10.00</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>${(getCartTotal() + 10).toFixed(2)}</strong></td></tr>
          </table>
          <Link to="/checkout"><button className="normal">Proceed to Checkout</button></Link>
        </div>
      </section>
    </section>
  );
};

export default CartPage;
