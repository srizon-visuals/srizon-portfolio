import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import SectionTitle from '../components/Shared/SectionTitle';
import { supabase } from '../services/supabase';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchServices();
  }, []);
  
  const fetchServices = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured, using empty data');
        setServices([]);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('"order"', { ascending: true });
      
      if (error) throw error;
      
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <main className="services-page">
      <Helmet>
        <title>Services | Srizon.Visuals</title>
        <meta name="description" content="Professional motion design, video editing, visual effects, graphic design, 3D animation, and creative consultation services." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="services-hero-content"
          >
            <h1>Creative Services</h1>
            <p>Specialized solutions to bring your visual projects to life</p>
          </motion.div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="services-overview section">
        <div className="container">
          <SectionTitle 
            title="What I Offer" 
            subtitle="Comprehensive creative services tailored to meet your project needs with expertise and attention to detail." 
            centered={true}
            onDark={false}
          />
          
          {loading ? (
            <div className="loading-message">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="no-data-message">No services data available. Please add services in your Supabase database.</div>
          ) : (
            <motion.div 
              className="services-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service) => (
                <motion.div 
                  className="service-card"
                  key={service.id}
                  variants={itemVariants}
                >
                  <div className="service-icon">
                    <i className={service.icon || 'fas fa-lightbulb'}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  <div className="service-details">
                    <ul>
                      {service.details && Array.isArray(service.details) && 
                        service.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))
                      }
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Process Section */}
      <section className="process-section section">
        <div className="container">
          <SectionTitle 
            title="My Process" 
            subtitle="A structured approach to delivering exceptional results for every project." 
            centered={true}
          />
          
          <div className="process-timeline">
            <motion.div 
              className="process-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Discovery</h3>
                <p>
                  In-depth consultation to understand your goals, target audience, 
                  and project requirements to establish a clear creative direction.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="process-step"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Concept Development</h3>
                <p>
                  Creating initial concepts and storyboards that align with your brand 
                  and messaging to visualize the final product before production begins.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="process-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Production</h3>
                <p>
                  Executing the approved concept with meticulous attention to detail, 
                  using industry-standard tools and techniques to create high-quality content.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="process-step"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Refinement</h3>
                <p>
                  Collaborative feedback and revision process to ensure the final product 
                  meets your expectations and achieves your communication objectives.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="process-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Delivery</h3>
                <p>
                  Providing final deliverables in the required formats along with any 
                  additional assets or documentation needed for implementation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="services-cta section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how I can help bring your creative vision to life.</p>
            <motion.a 
              href="/contact" 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;
