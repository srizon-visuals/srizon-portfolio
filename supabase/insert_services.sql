-- Insert Services Data
-- Copy and paste this into Supabase SQL Editor to add sample services

INSERT INTO services (title, icon, description, details, "order")
VALUES
  ('Motion Design', 'fas fa-film', 
   'Bringing static ideas to life through captivating animations and motion graphics that tell your story in a dynamic way.',
   '["Logo animations and brand identity", "Animated infographics", "UI/UX motion design", "Character animation", "Social media animations"]',
   1),
  
  ('Video Editing', 'fas fa-cut',
   'Crafting compelling narratives through precise editing, color grading, and seamless transitions that elevate your video content.',
   '["Commercial and promotional videos", "Social media content", "Interview and documentary editing", "Music videos", "Event highlight reels"]',
   2),
  
  ('Visual Effects', 'fas fa-magic',
   'Creating stunning visual effects that transform ordinary footage into extraordinary visual experiences that captivate viewers.',
   '["Compositing and green screen", "Particle effects and simulations", "CGI integration", "Screen replacements", "Environment enhancement"]',
   3),
  
  ('Graphic Design', 'fas fa-pencil-ruler',
   'Designing visual assets that communicate your message effectively while maintaining brand consistency across all platforms.',
   '["Brand identity and logos", "Marketing materials", "Social media graphics", "Presentation design", "Print collateral"]',
   4),
  
  ('3D Animation', 'fas fa-cube',
   'Building immersive three-dimensional worlds and animations that add depth and realism to your visual storytelling.',
   '["3D product visualization", "Architectural visualization", "Character modeling and animation", "Logo reveals", "Abstract 3D art"]',
   5),
  
  ('Creative Consultation', 'fas fa-lightbulb',
   'Providing expert guidance on visual strategy, creative direction, and production planning for your projects.',
   '["Creative concept development", "Storyboarding and pre-visualization", "Art direction", "Project scoping and planning", "Feedback and revision guidance"]',
   6);

-- Verify the data was inserted
SELECT * FROM services ORDER BY "order";
