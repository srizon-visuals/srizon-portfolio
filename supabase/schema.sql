-- Create Creative Pursuits table
CREATE TABLE creative_pursuits (
  id SERIAL PRIMARY KEY,
  client TEXT NOT NULL,
  description TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Media table for Creative Pursuits
CREATE TABLE creative_pursuits_media (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL REFERENCES creative_pursuits(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  title TEXT,
  src TEXT NOT NULL,
  thumbnail TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  details JSONB,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  thumbnail TEXT,
  images JSONB,
  video_url TEXT,
  client TEXT,
  date DATE,
  tags JSONB,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  industry TEXT,
  services_provided JSONB,
  testimonial TEXT,
  contact_person TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for Creative Pursuits
INSERT INTO creative_pursuits (client, description, "order")
VALUES
  ('DIGITAL MARTX', 'Marketing agency specializing in digital advertising. Services provided: Motion Design, Animated Ads, Poster Design', 1),
  ('TECHNOVA', 'Technology startup focusing on innovative solutions. Services provided: UI Animation, Product Videos, Presentation Design', 2),
  ('PERSONAL EXPLORATIONS', 'Experimental creative work and personal artistic projects', 3);

-- Insert sample media items for Creative Pursuits
-- Digital Martx Media
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, "order")
VALUES
  (1, 'video', 'Brand Animation', 'https://www.youtube.com/embed/abc123', 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-thumb1.jpg', 1),
  (1, 'image', 'Marketing Campaign Poster', 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-poster1.jpg', NULL, 2),
  (1, 'image', 'Event Promotion Design', 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-poster2.jpg', NULL, 3),
  (1, 'video', 'Social Media Ad', 'https://www.youtube.com/embed/def456', 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-thumb2.jpg', 4);

-- Technova Media
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, "order")
VALUES
  (2, 'video', 'UI Animation Demo', 'https://www.youtube.com/embed/ghi789', 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-thumb1.jpg', 1),
  (2, 'image', 'Investor Presentation', 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-presentation1.jpg', NULL, 2),
  (2, 'image', 'Product Showcase Design', 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-presentation2.jpg', NULL, 3),
  (2, 'video', 'Product Demo Video', 'https://www.youtube.com/embed/jkl012', 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-thumb2.jpg', 4);

-- Personal Explorations Media
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, "order")
VALUES
  (3, 'image', 'Abstract Composition', 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-artwork1.jpg', NULL, 1),
  (3, 'video', 'Motion Design Experiment', 'https://www.youtube.com/embed/mno345', 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-thumb1.jpg', 2),
  (3, 'image', 'Digital Art Series', 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-artwork2.jpg', NULL, 3),
  (3, 'image', 'Conceptual Photography', 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-artwork3.jpg', NULL, 4),
  (3, 'video', 'Experimental Animation', 'https://www.youtube.com/embed/pqr678', 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-thumb2.jpg', 5);

-- Insert sample data for Clients
INSERT INTO clients (name, logo, industry, services_provided, testimonial, contact_person, "order")
VALUES
  ('Digital Martx', 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-logo.png', 'Marketing Agency', 
   '["Motion Design", "Animated Ads", "Poster Design"]', 
   'Srizon brought incredible creativity to our campaigns, delivering animated content that significantly increased engagement metrics for our clients.', 
   'Sarah Johnson, Creative Director', 1),
  
  ('TechNova', 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-logo.png', 'Technology Startup', 
   '["UI Animation", "Product Videos", "Presentation Design"]', 
   'The product demonstration videos created by Srizon helped us explain our complex technology in a simple, engaging way that our investors loved.', 
   'Alex Chen, CEO', 2),
  
  ('EcoWare', 'https://res.cloudinary.com/demo/image/upload/v1312461204/ecoware-logo.png', 'Sustainable Products', 
   '["Commercial Editing", "Social Content", "3D Packaging Design"]', 
   'Our product launch videos consistently stand out in the market thanks to Srizon''s exceptional editing and 3D visualization skills.', 
   'Mira Patel, Marketing Manager', 3),
  
  ('Pulse Media', 'https://res.cloudinary.com/demo/image/upload/v1312461204/pulse-media-logo.png', 'Entertainment', 
   '["VFX", "Color Grading", "Motion Graphics"]', 
   'Srizon''s visual effects work elevated our music video production to a level that competes with major label releases.', 
   'David Wright, Producer', 4),
  
  ('FinEdge', 'https://res.cloudinary.com/demo/image/upload/v1312461204/finedge-logo.png', 'Financial Services', 
   '["Explainer Videos", "Character Animation", "Infographics"]', 
   'The explainer animations created by Srizon have become a cornerstone of our client onboarding process, making complex concepts accessible.', 
   'Lauren Taylor, Head of Client Relations', 5),
  
  ('Global Summit', 'https://res.cloudinary.com/demo/image/upload/v1312461204/global-summit-logo.png', 'Event Management', 
   '["Event Videography", "Highlight Reels", "Motion Graphics"]', 
   'The after-movie created by Srizon captured the essence of our conference perfectly and has been instrumental in marketing our next event.', 
   'Michael Singh, Event Director', 6);
