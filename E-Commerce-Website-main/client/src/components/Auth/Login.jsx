import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-p1" style={{maxWidth:'500px',margin:'50px auto'}}>
      <h2>Login</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
        <button type="submit" className="normal" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      </form>
      <p style={{marginTop:'20px'}}>Don't have an account? <Link to="/register">Register</Link></p>
    </section>
  );
};

export default Login;
