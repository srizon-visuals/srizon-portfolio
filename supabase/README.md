# Srizon.Visuals Portfolio Backend Setup

This document provides instructions for setting up the backend infrastructure for the Srizon.Visuals portfolio website.

## Backend Architecture

The backend uses the following services:
- **Supabase** for database storage and API
- **Cloudinary** for image hosting and transformations
- **YouTube** (unlisted videos) for video content

## Database Tables Overview

### 1. `creative_pursuits`
**Purpose**: Stores client projects showcased in the Creative Pursuits page  
**Used in**: `/creative-pursuits` page  
**Fields**:
- `id` - Unique identifier (auto-generated)
- `client` - Client/project name (e.g., "DIGITAL MARTX", "TECHNOVA")
- `description` - Brief description of services provided for the client
- `order` - Display order on the page (lower numbers appear first)
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Example**:
```sql
INSERT INTO creative_pursuits (client, description, order)
VALUES ('DIGITAL MARTX', 'Marketing agency specializing in digital advertising. Services provided: Motion Design, Animated Ads, Poster Design', 1);
```

### 2. `creative_pursuits_media`
**Purpose**: Stores media items (images/videos) for each creative pursuit client  
**Used in**: `/creative-pursuits` page (gallery items for each client)  
**Fields**:
- `id` - Unique identifier (auto-generated)
- `client_id` - References `creative_pursuits.id` (foreign key)
- `type` - Media type: 'image' or 'video'
- `title` - Title/caption for the media item
- `src` - Media URL (Cloudinary for images, YouTube embed for videos)
- `thumbnail` - Thumbnail URL (used for videos, optional for images)
- `order` - Display order within the client's gallery
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Example**:
```sql
INSERT INTO creative_pursuits_media (client_id, type, title, src, thumbnail, order)
VALUES (1, 'video', 'Brand Animation', 'https://www.youtube.com/embed/abc123', 'https://res.cloudinary.com/.../thumb.jpg', 1);
```

### 3. `services`
**Purpose**: Stores the services offered (Motion Design, Video Editing, etc.)  
**Used in**: `/services` page and home page services section  
**Fields**:
- `id` - Unique identifier (auto-generated)
- `title` - Service name (e.g., "Motion Design", "Video Editing")
- `icon` - Icon class or name for display
- `description` - Brief service description
- `details` - JSON object with additional details (packages, pricing, features, etc.)
- `order` - Display order on the page
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Example**:
```sql
INSERT INTO services (title, icon, description, details, order)
VALUES ('Motion Design', 'fas fa-magic', 'Creating engaging motion graphics and animations', 
'{"packages": ["Basic", "Standard", "Premium"], "features": ["2D Animation", "Typography", "Visual Effects"]}', 1);
```

### 4. `projects`
**Purpose**: Stores portfolio projects/works  
**Used in**: `/works` page and home page featured work section  
**Fields**:
- `id` - Unique identifier (auto-generated)
- `title` - Project title
- `category` - Project category (e.g., "Motion Design", "Video Editing", "VFX")
- `description` - Detailed project description
- `featured` - Boolean flag to mark projects for homepage
- `thumbnail` - Main project thumbnail URL
- `images` - JSON array of additional project images
- `video_url` - Project video URL (YouTube/Vimeo)
- `client` - Client name
- `date` - Project completion date
- `tags` - JSON array of project tags/skills used
- `order` - Display order on the page
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Example**:
```sql
INSERT INTO projects (title, category, description, featured, thumbnail, video_url, client, date, tags, order)
VALUES ('Brand Animation', 'Motion Design', 'Dynamic brand reveal animation', true, 
'https://res.cloudinary.com/.../thumb.jpg', 'https://www.youtube.com/embed/xyz', 
'Tech Corp', '2024-11-01', '["After Effects", "Cinema 4D"]', 1);
```

### 5. `clients`
**Purpose**: Stores client information for Experience page and homepage showcase  
**Used in**: `/experience` page (Clients & Collaborations section) + Home page client logos  
**Fields**:
- `id` - Unique identifier (auto-generated)
- `name` - Client company name
- `logo` - Logo image URL (Cloudinary)
- `industry` - Client's industry/sector (e.g., "Marketing Agency", "Technology Startup")
- `services_provided` - JSON array of services provided to this client
- `testimonial` - Client testimonial/quote about working with you
- `contact_person` - Name and title of the contact person (e.g., "Sarah Johnson, Creative Director")
- `order` - Display order
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Example**:
```sql
INSERT INTO clients (name, logo, industry, services_provided, testimonial, contact_person, order)
VALUES ('Digital Martx', 'https://res.cloudinary.com/.../logo.png', 'Marketing Agency',
'["Motion Design", "Animated Ads", "Poster Design"]',
'Srizon brought incredible creativity to our campaigns, delivering animated content that significantly increased engagement metrics.',
'Sarah Johnson, Creative Director', 1);
```

## Setup Instructions

### 1. Supabase Setup

1. Create a new project on [Supabase](https://supabase.io/)
2. Navigate to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `supabase/schema.sql` into the SQL Editor
4. Run the SQL queries to create the tables and insert initial data
5. In the Supabase dashboard, go to Settings > API to get your API URL and anon key
6. Add these values to your `.env` file:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 2. Cloudinary Setup

1. Create an account on [Cloudinary](https://cloudinary.com/)
2. From your dashboard, get your cloud name, API key, and API secret
3. Add these values to your `.env` file:
   ```
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   REACT_APP_CLOUDINARY_API_KEY=your_cloudinary_api_key
   REACT_APP_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Upload your images to Cloudinary and use the provided URLs in your Supabase database

### 3. YouTube Setup

1. Create unlisted videos on YouTube for your portfolio content
2. Use the YouTube embed URLs in your Supabase database
   - Format: `https://www.youtube.com/embed/VIDEO_ID`

## Data Management

### Updating Content

To update the content of your portfolio:

1. Log into your Supabase dashboard
2. Navigate to the Table Editor
3. Select the table you want to update (e.g., `creative_pursuits`, `creative_pursuits_media`)
4. Add, edit, or delete entries as needed

### Media URLs

- **Images**: Use Cloudinary URLs in the format:
  ```
  https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/image-name.jpg
  ```

- **Videos**: Use YouTube embed URLs in the format:
  ```
  https://www.youtube.com/embed/VIDEO_ID
  ```

## Fallback Mechanism

The application includes a fallback to mock data if there's an error connecting to Supabase. This ensures that your portfolio will display content even if there's a temporary API issue.

## Local Development

When developing locally, ensure your `.env` file is properly set up with all required API keys.

```bash
npm start
```

## Production Deployment

Before deploying to production:

1. Ensure all your media assets are uploaded to Cloudinary and YouTube
2. Verify that your Supabase tables contain the correct data
3. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
