import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import LazyLoad from 'react-lazyload';
import SectionTitle from '../components/Shared/SectionTitle';
import { supabase } from '../services/supabase';
import './Experience.css';

const Experience = () => {
  const [activeClient, setActiveClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchClients();
  }, []);
  
  const fetchClients = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured, using empty data');
        setClients([]);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('"order"', { ascending: true });
      
      if (error) throw error;
      
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClientHover = (clientId) => {
    setActiveClient(clientId);
  };
  
  const handleClientLeave = () => {
    setActiveClient(null);
  };
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <main className="experience-page">
      <Helmet>
        <title>Experience | Srizon.Visuals</title>
        <meta name="description" content="Professional experience working with clients across various industries on motion design, video editing, and visual effects projects." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="experience-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="experience-hero-content"
          >
            <h1>Client Experience</h1>
            <p>Collaborations with brands and agencies across various industries</p>
          </motion.div>
        </div>
      </section>
      
      {/* Clients Section */}
      <section className="clients-section section">
        <div className="container">
          <SectionTitle 
            title="Clients & Collaborations" 
            subtitle="I've had the pleasure of working with these amazing brands and organizations on creative projects." 
            centered={true}
            onDark={false}
          />
          
          {loading ? (
            <div className="loading-message">Loading clients...</div>
          ) : clients.length === 0 ? (
            <div className="no-data-message">No clients data available. Please add clients in your Supabase database.</div>
          ) : (
            <motion.div 
              className="clients-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {clients.map((client) => (
                <motion.div 
                  key={client.id}
                  className="client-card"
                  variants={itemVariants}
                  onMouseEnter={() => handleClientHover(client.id)}
                  onMouseLeave={handleClientLeave}
                >
                  <div className="client-logo-container">
                    <LazyLoad height={120} offset={100} once>
                      <img 
                        src={client.logo} 
                        alt={`${client.name} Logo`} 
                        className={`client-logo ${activeClient === client.id ? 'active' : ''}`}
                      />
                    </LazyLoad>
                  </div>
                  
                  <motion.div 
                    className={`client-details ${activeClient === client.id ? 'visible' : ''}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeClient === client.id ? 1 : 0,
                      height: activeClient === client.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3>{client.name}</h3>
                    <p className="client-industry">{client.industry}</p>
                    
                    <div className="services-provided">
                      <h4>Services Provided:</h4>
                      <ul>
                        {client.services_provided && Array.isArray(client.services_provided) && 
                          client.services_provided.map((service, index) => (
                            <li key={index}>{service}</li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    {client.testimonial && (
                      <div className="testimonial">
                        <p>"{client.testimonial}"</p>
                        {client.contact_person && (
                          <p className="testimonial-author">— {client.contact_person}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Expertise Section */}
      <section className="expertise-section section">
        <div className="container">
          <SectionTitle 
            title="Industry Expertise" 
            subtitle="Experience working across various industries with specialized knowledge of their unique needs and requirements." 
            centered={true}
          />
          
          <div className="expertise-grid">
            <motion.div 
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="expertise-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h3>Marketing & Advertising</h3>
              <p>
                Creating engaging promotional content for campaigns across digital and traditional media channels,
                with a focus on driving conversion and brand recognition.
              </p>
            </motion.div>
            
            <motion.div 
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="expertise-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Technology & Software</h3>
              <p>
                Simplifying complex technical concepts through clear, visually compelling explainer videos
                and product demonstrations for tech companies.
              </p>
            </motion.div>
            
            <motion.div 
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="expertise-icon">
                <i className="fas fa-tshirt"></i>
              </div>
              <h3>Fashion & Lifestyle</h3>
              <p>
                Producing stylish, trend-conscious content that showcases products and brand identity
                with attention to aesthetic detail and current visual trends.
              </p>
            </motion.div>
            
            <motion.div 
              className="expertise-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="expertise-icon">
                <i className="fas fa-university"></i>
              </div>
              <h3>Finance & Corporate</h3>
              <p>
                Developing professional, trust-building content that communicates complex financial information
                in an accessible and engaging manner.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="timeline-section section">
        <div className="container">
          <SectionTitle 
            title="Professional Journey" 
            subtitle="A timeline of my career highlights and significant professional milestones." 
            centered={true}
          />
          
          <div className="timeline">
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">2024 - Present</span>
                <h3>Freelance Motion Designer & Video Editor</h3>
                <p>
                  Working with a diverse client base including technology startups, marketing agencies, 
                  and corporate clients to deliver high-quality visual content.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content right">
                <span className="timeline-date">2022 - 2024</span>
                <h3>Senior Motion Designer at Digital Martx</h3>
                <p>
                  Led a team of designers to create innovative motion graphics and video content
                  for major brands, overseeing projects from concept to delivery.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">2020 - 2022</span>
                <h3>Video Editor at Pulse Media</h3>
                <p>
                  Created compelling video content for entertainment clients, including music videos,
                  promotional materials, and social media assets.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content right">
                <span className="timeline-date">2019 - 2020</span>
                <h3>Junior Motion Designer at Creative Spark</h3>
                <p>
                  Assisted in the development of motion graphics and animations for advertising campaigns
                  and brand identity projects.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Experience;
