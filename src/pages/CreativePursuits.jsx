import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import SectionTitle from '../components/Shared/SectionTitle';
import { fetchCreativePursuits } from '../services/api';
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '../services/youtube';
import './CreativePursuits.css';

// Make sure to bind modal to your app element for accessibility
Modal.setAppElement('#root');

const CreativePursuits = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [creativePursuits, setCreativePursuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data from Supabase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCreativePursuits();
        
        // Ensure we have valid data
        if (data && Array.isArray(data)) {
          console.log('Received creative pursuits data:', data);
          setCreativePursuits(data);
          setError(null);
        } else {
          console.error("Invalid data format received:", data);
          setError("Received invalid data format. Using fallback data.");
          // Use fallback data if available from the mock
          setCreativePursuits([]);
        }
      } catch (err) {
        console.error("Error fetching creative pursuits data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const openModal = (media) => {
    console.log('Opening modal with media:', media);
    // For YouTube videos, ensure we're using the embed URL
    if (media.type === 'video' && media.src) {
      const embedUrl = getYouTubeEmbedUrl(media.src);
      console.log('Original src:', media.src);
      console.log('Embed URL:', embedUrl);
      setSelectedMedia({...media, src: embedUrl});
    } else {
      setSelectedMedia(media);
    }
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <main className="creative-pursuits-page">
      <Helmet>
        <title>Creative Pursuits | Srizon.Visuals</title>
        <meta name="description" content="Explore Srizon.Visuals' creative projects, personal explorations, and artistic collaborations in motion design and visual storytelling." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="creative-pursuits-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="creative-pursuits-hero-content"
          >
            <h1>Creative Pursuits</h1>
            <p>Artistic explorations, personal projects, and creative collaborations</p>
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="gallery-section section">
        <div className="container">
          <SectionTitle 
            title="Project Gallery" 
            subtitle="A showcase of creative work across various clients and personal explorations." 
            centered={true}
            onDark={false}
          />
          
          <div className="client-gallery">
            {loading ? (
              <div className="loading-container">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="loading-spinner"
                />
                <p>Loading creative projects...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
              </div>
            ) : creativePursuits.length === 0 ? (
              <div className="empty-container">
                <p>No creative projects available at the moment.</p>
              </div>
            ) : (
              creativePursuits.map((client, index) => (
                <motion.section 
                  className="client-block"
                  key={client.id || index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.h2 
                    initial={{opacity: 0, y: -20}} 
                    animate={{opacity: 1, y: 0}} 
                    transition={{duration: 0.6}}
                  >
                    {client.client}
                  </motion.h2>
                  
                  <p>{client.description}</p>
                  
                  <motion.div 
                    className="media-gallery"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {client.media.map((item, i) => (
                      <motion.div 
                        className="media-item" 
                        key={item.id || i} 
                        variants={itemVariants}
                        onClick={() => openModal(item)}
                      >
                        <LazyLoad height={240} offset={100} once>
                          {item.type === 'image' ? (
                            <img src={item.src} alt={item.title || ""} />
                          ) : (
                            <div className="video-thumbnail">
                              <img 
                                src={item.thumbnail || getYouTubeThumbnailUrl(item.src)} 
                                alt={item.title || ""}
                              />
                              <div className="play-button">
                                <i className="fas fa-play"></i>
                              </div>
                            </div>
                          )}
                        </LazyLoad>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Media Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="media-modal"
        overlayClassName="modal-overlay"
        contentLabel="Media Viewer"
      >
        <button className="close-modal" onClick={closeModal}>×</button>
        
        <div className="modal-content">
          {console.log('Selected media in modal:', selectedMedia)}
          {selectedMedia && selectedMedia.type === 'video' ? (
            // Check if it's a YouTube video URL
            selectedMedia.src && selectedMedia.src.includes('youtube.com') ? (
              <div className="youtube-embed">
                <iframe 
                  src={selectedMedia.src}
                  title={selectedMedia.title || "Video Preview"} 
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              // Regular video file
              <video 
                src={selectedMedia.src}
                controls 
                autoPlay 
                className="modal-media" 
              />
            )
          ) : (
            selectedMedia && (
              <img 
                src={selectedMedia.src}
                alt={selectedMedia.title || ""} 
                className="modal-media" 
              />
            )
          )}
        </div>
      </Modal>
      
      {/* Artist Statement Section */}
      <section className="statement-section section">
        <div className="container">
          <SectionTitle 
            title="Creative Philosophy" 
            subtitle="My approach to visual storytelling and artistic creation." 
            centered={true}
            onDark={false}
          />
          
          <motion.div 
            className="statement-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              As a visual storyteller, I believe in the power of motion and imagery to convey emotion,
              inspire action, and create meaningful connections with audiences. My creative philosophy
              is centered on balancing technical precision with artistic exploration, always seeking to
              push boundaries while delivering work that resonates with viewers.
            </p>
            
            <p>
              Every project—whether commercial or personal—is an opportunity to experiment with new techniques,
              refine my visual language, and grow as an artist. I draw inspiration from diverse sources:
              from classic cinema and contemporary design to natural patterns and urban environments.
            </p>
            
            <p>
              The creative pursuits showcased here represent moments of artistic freedom, experimentation,
              and collaboration. They reflect my ongoing journey to develop a distinctive visual voice
              while continuously evolving my craft through curiosity and practice.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Skills & Tools Section */}
      <section className="skills-section section">
        <div className="container">
          <SectionTitle 
            title="Skills & Tools" 
            subtitle="The creative and technical capabilities that bring my projects to life." 
            centered={true}
            onDark={false}
          />
          
          <div className="skills-grid">
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>Design</h3>
              <ul className="skills-list">
                <li>Visual Storytelling</li>
                <li>Storyboarding</li>
                <li>Art Direction</li>
                <li>Color Theory</li>
                <li>Typography</li>
                <li>Layout Design</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Animation</h3>
              <ul className="skills-list">
                <li>Character Animation</li>
                <li>Kinetic Typography</li>
                <li>Logo Animation</li>
                <li>UI Motion</li>
                <li>Liquid Motion</li>
                <li>Particles & Effects</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3>Software</h3>
              <ul className="skills-list">
                <li>Adobe After Effects</li>
                <li>Adobe Premiere Pro</li>
                <li>Adobe Illustrator</li>
                <li>Adobe Photoshop</li>
                <li>Cinema 4D</li>
                <li>DaVinci Resolve</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3>Techniques</h3>
              <ul className="skills-list">
                <li>Compositing</li>
                <li>Color Grading</li>
                <li>Visual Effects</li>
                <li>3D Modeling</li>
                <li>Sound Design</li>
                <li>Rotoscoping</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreativePursuits;
