-- Drop existing tables
DROP TABLE IF EXISTS creative_pursuits_media CASCADE;
DROP TABLE IF EXISTS creative_pursuits CASCADE;

-- Recreate Creative Pursuits table with TEXT id
CREATE TABLE creative_pursuits (
  id TEXT PRIMARY KEY,
  client TEXT NOT NULL,
  description TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate Media table with TEXT foreign key
CREATE TABLE creative_pursuits_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT NOT NULL REFERENCES creative_pursuits(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  title TEXT,
  src TEXT NOT NULL,
  thumbnail TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
