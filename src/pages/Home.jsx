import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import SectionTitle from '../components/Shared/SectionTitle';
import Button from '../components/Shared/Button';
import { supabase } from '../services/supabase';
import { getYouTubeThumbnailUrl } from '../services/youtube';
import placeholderPortrait from '../assets/images/placeholder-portrait.png';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    awards: 0
  });
  
  const [featuredProjects, setFeaturedProjects] = useState([]);
  
  // Fetch featured projects
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        if (!supabase) return;
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('featured', true)
          .order('"order"', { ascending: true })
          .limit(3);
        
        if (error) throw error;
        console.log('Featured projects data:', data);
        if (data && data.length > 0) {
          data.forEach(project => {
            const thumbnailUrl = project.thumbnail || getYouTubeThumbnailUrl(project.video_url, 'maxresdefault');
            console.log(`Project: ${project.title}`);
            console.log(`Video URL: ${project.video_url}`);
            console.log(`Thumbnail URL: ${thumbnailUrl}`);
          });
        }
        setFeaturedProjects(data || []);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      }
    };
    
    fetchFeaturedProjects();
  }, []);
  
  // Stats counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => {
        return {
          years: prevStats.years < 5 ? prevStats.years + 1 : 5,
          projects: prevStats.projects < 120 ? prevStats.projects + 4 : 120,
          clients: prevStats.clients < 40 ? prevStats.clients + 2 : 40,
          awards: prevStats.awards < 12 ? prevStats.awards + 1 : 12
        };
      });
    }, 100);
    
    // Clear interval when all values reach their maximum
    if (stats.years === 5 && stats.projects === 120 && stats.clients === 40 && stats.awards === 12) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [stats]);
  
  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <main className="home">
      <Helmet>
        <title>Srizon.Visuals | Creative Motion Design & Video Editing Portfolio</title>
        <meta name="description" content="Srizon.Visuals specializes in motion design, video editing, and visual effects for brands and creative projects." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="animated-gradient"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="heading-container">
              <motion.h1 className="animated-heading perspective-text">
                <motion.div 
                  className="text-reveal-container"
                  initial={{ perspective: "1000px" }}
                  animate={{ perspective: "1000px" }}
                >
                  <motion.div className="portfolio-title">
                    <div className="roll-title-container">
                      <div className="roll-title">
                        <div className="roll-text">SRIZON VISUALS</div>
                        <div className="roll-text">MOTION DESIGN</div>
                        <div className="roll-text">VISUAL STORIES</div>
                      </div>
                    </div>
                  </motion.div>
                
                  

                </motion.div>
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2,
                delay: 1.6,
                ease: "easeOut"
              }}
              className="hero-subtext"
            >
              Visual storytelling through motion design and video editing.
              Creating impactful digital experiences that leave lasting impressions.
            </motion.p>
            
            <motion.div
              className="portfolio-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.7,
                delay: 1.8
              }}
            >
              <Button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255, 45, 45, 0.7)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <Link to="/works">Explore Work</Link>
              </Button>
              
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 2.2,
            ease: "easeOut"
          }}
        >
          <div className="mouse"></div>
          <p>Scroll to explore</p>
        </motion.div>
      </section>
      
      {/* About Section */}
      <section className="about section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <motion.div 
                className="portrait-container"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={placeholderPortrait} alt="Srizon Portrait" />
                <div className="portrait-shape"></div>
              </motion.div>
            </div>
            
            <div className="about-content">
              <SectionTitle 
                title="About Me" 
                subtitle="I'm a visual storyteller specializing in motion design and video editing with a passion for bringing ideas to life." 
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="about-text">
                  With over 5 years of experience in the creative industry, I've collaborated with brands
                  and agencies to create compelling visual stories that engage and inspire audiences. My approach
                  combines technical expertise with artistic vision to deliver results that exceed expectations.
                </p>
                
                <p className="about-text">
                  I believe that great motion design is about more than just making things move—it's about
                  creating meaningful connections through visual storytelling that resonates with viewers.
                </p>
                
                <div className="stats-container">
                  <div className="stat-item">
                    <h3>{stats.years}+</h3>
                    <p>Years Experience</p>
                  </div>
                  
                  <div className="stat-item">
                    <h3>{stats.projects}+</h3>
                    <p>Projects Completed</p>
                  </div>
                  
                  <div className="stat-item">
                    <h3>{stats.clients}+</h3>
                    <p>Satisfied Clients</p>
                  </div>
                  
                  <div className="stat-item">
                    <h3>{stats.awards}</h3>
                    <p>Awards</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="about-cta">
            <Button>
              <Link to="/contact">Let's Work Together</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Me Section */}
      <section className="why-me section">
        <div className="container">
          <SectionTitle 
            title="Why Choose Me" 
            subtitle="What sets my work apart and how I can help you achieve your creative vision." 
            centered={true}
            onDark={true}
          />
          
          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Creative Vision</h3>
              <p>Unique creative approach that combines technical skill with artistic innovation.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Timely Delivery</h3>
              <p>Consistent track record of delivering high-quality work on or before deadlines.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Clear Communication</h3>
              <p>Regular updates and responsive communication throughout your project.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3>Technical Expertise</h3>
              <p>Mastery of industry-standard software and cutting-edge techniques.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Results-Driven</h3>
              <p>Focus on creating work that achieves your specific goals and objectives.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <h3>Adaptability</h3>
              <p>Flexible approach to accommodate changes and evolving project needs.</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="why-me-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/services">
              <Button>Explore Services</Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="featured-work section">
        <div className="container">
          <SectionTitle 
            title="Featured Work" 
            subtitle="A selection of recent projects showcasing my skills and creative approach." 
            centered={true}
            onDark={true}
          />
          
          <div className="featured-grid">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => {
                const thumbnailUrl = project.video_url 
                  ? getYouTubeThumbnailUrl(project.video_url, 'maxresdefault')
                  : project.thumbnail;
                
                return (
                  <motion.div 
                    key={project.id}
                    className={`featured-item ${index === 0 ? 'large' : ''}`}
                    style={{
                      backgroundImage: `url(${thumbnailUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="featured-overlay">
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>
                      <Link to="/works" className="view-project">View Project</Link>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>No featured projects available.</p>
            )}
          </div>
          
          <motion.div
            className="featured-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/works">
              <Button>View All Projects</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
