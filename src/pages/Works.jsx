import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import SectionTitle from '../components/Shared/SectionTitle';
import { supabase } from '../services/supabase';
import './Works.css';

// Make sure to bind modal to your app element for accessibility
Modal.setAppElement('#root');

const Works = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  const fetchProjects = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured, using empty data');
        setProjects([]);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('"order"', { ascending: true });
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Get unique categories for filter buttons
  const categories = ['All', ...new Set(projects.map(project => project.category).filter(Boolean))];
  
  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Extract video ID from various YouTube URL formats
    let videoId = null;
    
    // Regular watch URL: youtube.com/watch?v=VIDEO_ID
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    // Short URL: youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Shorts URL: youtube.com/shorts/VIDEO_ID
    else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('/shorts/')[1].split('?')[0];
    }
    // Already embed URL
    else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };
  
  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    if (!url || !url.includes('youtube')) return null;
    
    let videoId = null;
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('/shorts/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('/embed/')[1].split('?')[0];
    }
    
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);
    
  const openModal = (project) => {
    console.log('Opening project:', project);
    console.log('Video URL:', project.video_url);
    console.log('Embed URL:', getYouTubeEmbedUrl(project.video_url));
    setSelectedProject(project);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };
  
  // Animation variants
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
    <main className="works-page">
      <Helmet>
        <title>Portfolio | Srizon.Visuals</title>
        <meta name="description" content="Explore Srizon.Visuals' portfolio of motion design, video editing, and visual effects projects." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="works-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="works-hero-content"
          >
            <h1>My Portfolio</h1>
            <p>A showcase of my creative work across various media and industries</p>
          </motion.div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="portfolio-section section">
        <div className="container">
          <SectionTitle 
            title="Featured Projects" 
            subtitle="Browse through a selection of my best work in motion design, video editing, and visual effects." 
            centered={true}
          />
          
          {/* Filter Buttons */}
          <motion.div 
            className="filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Projects Grid */}
          {loading ? (
            <div className="loading-message">Loading projects...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="no-data-message">
              {filter === 'All' 
                ? 'No projects data available. Please add projects in your Supabase database.'
                : `No projects found in category "${filter}".`
              }
            </div>
          ) : (
            <motion.div 
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    className="project-item"
                    variants={itemVariants}
                    onClick={() => openModal(project)}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="project-thumbnail">
                      <img 
                        src={project.video_url ? getYouTubeThumbnail(project.video_url) || project.thumbnail : project.thumbnail} 
                        alt={project.title}
                        loading="lazy"
                      />
                      <div className="project-overlay">
                        <span>{project.category}</span>
                        <h3>{project.title}</h3>
                        <button className="view-project-btn">View Project</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Project Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="project-modal"
        overlayClassName="modal-overlay"
        contentLabel="Project Details"
      >
        {selectedProject && (
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
            </div>
            
            <div className="project-media">
              {selectedProject.video_url ? (
                <>
                  <div className="video-container">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedProject.video_url)}
                      title={selectedProject.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="category-badge-container">
                    <div className="category-badge">
                      {selectedProject.category}
                    </div>
                  </div>
                </>
              ) : selectedProject.thumbnail ? (
                <img 
                  src={selectedProject.thumbnail} 
                  alt={selectedProject.title} 
                  className="media-item" 
                />
              ) : null}
            </div>
            
            <div className="project-details">
              <div className="detail-section">
                <h3>Project Description</h3>
                <p>{selectedProject.description}</p>
              </div>
              
              {selectedProject.client && (
                <div className="detail-section">
                  <h3>Client</h3>
                  <p>{selectedProject.client}</p>
                </div>
              )}
              
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className="detail-section">
                  <h3>Tags</h3>
                  <div className="project-tags">
                    {selectedProject.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Works;
