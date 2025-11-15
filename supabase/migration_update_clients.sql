-- Migration: Update clients table to include testimonials and detailed information
-- Run this in your Supabase SQL Editor

-- First, delete existing sample data (if any)
DELETE FROM clients;

-- Add new columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='clients' AND column_name='industry') THEN
    ALTER TABLE clients ADD COLUMN industry TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='clients' AND column_name='services_provided') THEN
    ALTER TABLE clients ADD COLUMN services_provided JSONB;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='clients' AND column_name='testimonial') THEN
    ALTER TABLE clients ADD COLUMN testimonial TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='clients' AND column_name='contact_person') THEN
    ALTER TABLE clients ADD COLUMN contact_person TEXT;
  END IF;
END $$;

-- Insert sample client data
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

-- Verify the data was inserted
SELECT * FROM clients ORDER BY "order";
