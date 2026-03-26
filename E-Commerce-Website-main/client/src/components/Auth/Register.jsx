import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-p1" style={{maxWidth:'500px',margin:'50px auto'}}>
      <h2>Register</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
        <input type="password" placeholder="Password (min 6 characters)" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
        <button type="submit" className="normal" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
      </form>
      <p style={{marginTop:'20px'}}>Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
};

export default Register;
