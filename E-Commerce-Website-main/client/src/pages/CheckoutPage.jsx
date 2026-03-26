import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      setError('Please fill in all address fields');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await createOrder({
        shippingAddress
      });
      
      setSuccess(`✓ Order placed successfully! Order #${response.data.order.orderNumber}`);
      await clearCart();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-p1" style={{maxWidth:'800px',margin:'50px auto'}}>
      <h2>Checkout</h2>
      
      {error && <div style={{color:'#d32f2f', background:'#ffebee', padding:'15px', borderRadius:'4px', marginBottom:'20px'}}>{error}</div>}
      {success && <div style={{color:'#155724', background:'#d4edda', padding:'15px', borderRadius:'4px', marginBottom:'20px'}}>{success}</div>}
      
      <div style={{background:'white', padding:'30px', borderRadius:'8px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
        <h3>Order Summary</h3>
        
        <div style={{marginBottom:'20px', maxHeight:'300px', overflowY:'auto'}}>
          <h4>Items in Cart:</h4>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:'2px solid #ddd'}}>
                  <th style={{textAlign:'left', padding:'10px'}}>Product</th>
                  <th style={{textAlign:'center', padding:'10px'}}>Qty</th>
                  <th style={{textAlign:'right', padding:'10px'}}>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item._id} style={{borderBottom:'1px solid #eee'}}>
                    <td style={{padding:'10px'}}>{item.product?.name || 'Product'} {item.size && `(${item.size})`}</td>
                    <td style={{textAlign:'center', padding:'10px'}}>{item.quantity}</td>
                    <td style={{textAlign:'right', padding:'10px'}}>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div style={{background:'#f5f5f5', padding:'20px', borderRadius:'4px', marginBottom:'20px'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'18px', fontWeight:'600', borderTop:'2px solid #ddd', paddingTop:'10px'}}>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        <h3 style={{marginTop:'30px'}}>Shipping Address</h3>
        <div style={{display:'grid', gap:'15px'}}>
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={shippingAddress.street}
            onChange={handleAddressChange}
            style={{padding:'10px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            style={{padding:'10px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            onChange={handleAddressChange}
            style={{padding:'10px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleAddressChange}
            style={{padding:'10px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
        </div>
        
        <button 
          onClick={handlePlaceOrder}
          disabled={loading}
          style={{
            width:'100%',
            padding:'15px',
            marginTop:'20px',
            background: loading ? '#ccc' : '#667eea',
            color:'white',
            border:'none',
            borderRadius:'4px',
            fontSize:'16px',
            fontWeight:'600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition:'background 0.3s'
          }}
          onMouseOver={(e) => !loading && (e.target.style.background = '#764ba2')}
          onMouseOut={(e) => !loading && (e.target.style.background = '#667eea')}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </section>
  );
};

export default CheckoutPage;
