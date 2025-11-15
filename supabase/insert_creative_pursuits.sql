-- Clear existing data
DELETE FROM creative_pursuits_media;
DELETE FROM creative_pursuits;

-- Insert Creative Pursuits with readable IDs
INSERT INTO creative_pursuits (id, client, description, "order")
VALUES
  ('music-videos', 'Music Videos', 'Personal music video projects and lyrical videos', 1),
  ('motion-graphics', 'Motion Graphics', 'Experimental motion design and animation work', 2),
  ('visual-effects', 'Visual Effects', 'VFX experiments and creative visual storytelling', 3)
ON CONFLICT (id) DO UPDATE SET
  client = EXCLUDED.client,
  description = EXCLUDED.description,
  "order" = EXCLUDED."order",
  updated_at = NOW();

-- Insert Media for Music Videos
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, "order")
VALUES
  ('music-videos', 'video', 'Ishq Bulaava - Lyrical Video', 'https://www.youtube.com/watch?v=USOBMJ5dZ-Q', 'https://img.youtube.com/vi/USOBMJ5dZ-Q/maxresdefault.jpg', 1),
  ('music-videos', 'video', 'Ambarsariya - Lyrical Video', 'https://www.youtube.com/watch?v=oMesPehN_Do', 'https://img.youtube.com/vi/oMesPehN_Do/maxresdefault.jpg', 2),
  ('music-videos', 'video', 'Phir Le Aya Dil', 'https://www.youtube.com/watch?v=eIhFLjVo0a8', 'https://img.youtube.com/vi/eIhFLjVo0a8/maxresdefault.jpg', 3);

-- Insert Media for Motion Graphics
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, "order")
VALUES
  ('motion-graphics', 'video', 'Product Animation', 'https://youtube.com/shorts/VKxsYA7U1AA', 'https://img.youtube.com/vi/VKxsYA7U1AA/maxresdefault.jpg', 1),
  ('motion-graphics', 'video', 'Logo Animation Reel', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 2);

-- Insert Media for Visual Effects
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, "order")
VALUES
  ('visual-effects', 'video', 'VFX Breakdown', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', 'https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg', 1),
  ('visual-effects', 'video', 'Cinematic Effects', 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg', 2);
