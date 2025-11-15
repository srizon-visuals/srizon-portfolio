import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import SectionTitle from '../components/Shared/SectionTitle';
import Button from '../components/Shared/Button';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false,
    error: null
  });
  
  const [focusedField, setFocusedField] = useState(null);
  
  const handleInputFocus = (field) => {
    setFocusedField(field);
  };
  
  const handleInputBlur = () => {
    setFocusedField(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        loading: false, 
        submitted: true,
        name: '',
        email: '',
        subject: '',
        message: ''
      }));
    }, 1500);
  };
  
  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact | Srizon.Visuals</title>
        <meta name="description" content="Get in touch with Srizon.Visuals for your motion design, video editing, or visual effects project. Let's collaborate to bring your vision to life." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-hero-content"
          >
            <h1>Let's Connect</h1>
            <p>Ready to discuss your project or have questions? Get in touch!</p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="contact-grid">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle 
                title="Contact Information" 
                subtitle="Multiple ways to reach out and start a conversation." 
              />
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-details">
                    <h3>Email</h3>
                    <p>hello@srizon-visuals.com</p>
                    <p>info@srizon-visuals.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="method-details">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri: 9am - 6pm EST</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-details">
                    <h3>Location</h3>
                    <p>New York, NY</p>
                    <p>Available for remote work worldwide</p>
                  </div>
                </div>
              </div>
              
              <div className="social-contact">
                <h3>Connect on Social Media</h3>
                <div className="social-icons">
                  <motion.a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <i className="fab fa-instagram"></i>
                  </motion.a>
                  
                  <motion.a 
                    href="https://dribbble.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ rotate: -10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <i className="fab fa-dribbble"></i>
                  </motion.a>
                  
                  <motion.a 
                    href="https://behance.net" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <i className="fab fa-behance"></i>
                  </motion.a>
                  
                  <motion.a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ rotate: -10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>Send a Message</h2>
              
              {formState.submitted ? (
                <motion.div 
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="success-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <Button onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className={`input-container ${focusedField === 'name' || formState.name ? 'active' : ''}`}>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('name')}
                        onBlur={handleInputBlur}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className={`input-container ${focusedField === 'email' || formState.email ? 'active' : ''}`}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className={`input-container ${focusedField === 'subject' || formState.subject ? 'active' : ''}`}>
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('subject')}
                        onBlur={handleInputBlur}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className={`input-container ${focusedField === 'message' || formState.message ? 'active' : ''}`}>
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formState.message}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('message')}
                        onBlur={handleInputBlur}
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="form-submit">
                    <Button type="submit" disabled={formState.loading}>
                      {formState.loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section (Optional) */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692734!2d90.25446292031966!3d23.780753027140174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Contact;
