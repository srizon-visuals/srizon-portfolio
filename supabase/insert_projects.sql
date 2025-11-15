-- Insert Projects Data
-- Copy and paste this into Supabase SQL Editor to add sample projects
-- Thumbnails are auto-generated from YouTube video URLs

INSERT INTO projects (title, category, description, featured, video_url, client, tags, "order")
VALUES
  ('Brand Launch Campaign', 'Motion Design',
   'A complete brand identity animation package including logo reveals, social media templates, and promotional animations for a tech startup launch.',
   true,
   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   'TechStart Inc',
   '["Motion Graphics", "Brand Identity", "Logo Animation", "After Effects"]',
   1),
  
  ('Corporate Documentary', 'Video Editing',
   'A 15-minute documentary showcasing company culture, featuring interviews with executives and employees, capturing their journey and values.',
   true,
   'https://www.youtube.com/watch?v=jNQXAC9IVRw',
   'Global Solutions Ltd',
   '["Documentary", "Corporate", "Interviews", "Color Grading"]',
   2),
  
  ('Music Video Production', 'VFX',
   'Creative music video with heavy visual effects, including green screen compositing, particle effects, and surreal environment enhancements.',
   true,
   'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
   'Independent Artist',
   '["Music Video", "VFX", "Compositing", "Green Screen"]',
   3),
  
  ('E-commerce Product Showcase', '3D Animation',
   'Photorealistic 3D product animations for e-commerce platform, featuring 360-degree product views and interactive demonstrations.',
   false,
   'https://www.youtube.com/watch?v=9bZkp7q19f0',
   'ShopStyle',
   '["3D Modeling", "Product Visualization", "E-commerce", "Blender"]',
   4),
  
  ('Social Media Campaign', 'Graphic Design',
   'Complete social media design package including feed posts, stories, reels covers, and highlight icons for Instagram and Facebook.',
   false,
   'https://www.youtube.com/watch?v=y6120QOlsfU',
   'Fashion Brand Co',
   '["Social Media", "Graphic Design", "Brand Assets", "Adobe Illustrator"]',
   5),
  
  ('Event Highlight Reel', 'Video Editing',
   'Fast-paced highlight reel of annual conference, capturing keynote moments, networking sessions, and atmosphere with dynamic editing.',
   true,
   'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
   'Annual Tech Conference',
   '["Event Video", "Highlight Reel", "Conference", "Fast-paced Editing"]',
   6);

-- Verify the data was inserted
SELECT * FROM projects ORDER BY "order";
