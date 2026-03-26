import React from 'react';
import './About.css';

const About = () => {
  const team = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/img/people/1.png',
      bio: 'Fashion enthusiast with 15+ years of industry experience'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Design',
      image: '/img/people/2.png',
      bio: 'Creative director passionate about sustainable fashion'
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Customer Experience Manager',
      image: '/img/people/3.png',
      bio: 'Dedicated to providing exceptional customer service'
    }
  ];

  const values = [
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'We are committed to eco-friendly practices and sustainable fashion choices.'
    },
    {
      icon: '💎',
      title: 'Quality',
      description: 'Every product is carefully selected to ensure the highest quality standards.'
    },
    {
      icon: '❤️',
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond for our customers.'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'We celebrate diversity and serve customers from around the world.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Purrchase</h1>
          <p>Your destination for premium fashion and lifestyle products</p>
        </div>
      </div>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Purrchase was founded in 2020 with a simple mission: to make premium fashion accessible to everyone. 
                What started as a small online boutique has grown into a thriving e-commerce platform serving thousands 
                of customers worldwide.
              </p>
              <p>
                We believe that fashion should be inclusive, sustainable, and empowering. Every product in our collection 
                is handpicked by our team of fashion experts to ensure it meets our high standards for quality and style.
              </p>
              <p>
                Today, Purrchase is more than just an online store—it's a community of fashion enthusiasts, trendsetters, 
                and style-conscious individuals who share our passion for quality and sustainability.
              </p>
            </div>
            <div className="story-image">
              <img src="/img/hero4.png" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map(value => (
              <div key={value.title} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>10K+</h3>
              <p>Products</p>
            </div>
            <div className="stat-card">
              <h3>150+</h3>
              <p>Brands</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Join Our Community</h2>
          <p>Discover the latest trends and exclusive offers</p>
          <button className="cta-button">Start Shopping</button>
        </div>
      </section>
    </div>
  );
};

export default About;
