-- Disable Row Level Security (RLS) for all tables to allow public read access
-- Run this in your Supabase SQL Editor

-- Disable RLS on services table
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Disable RLS on clients table
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;

-- Disable RLS on projects table
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Disable RLS on creative_pursuits table
ALTER TABLE creative_pursuits DISABLE ROW LEVEL SECURITY;

-- Disable RLS on creative_pursuits_media table
ALTER TABLE creative_pursuits_media DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('services', 'clients', 'projects', 'creative_pursuits', 'creative_pursuits_media');
