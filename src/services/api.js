import { supabase } from './supabase';

// Fetch creative pursuits data from Supabase
export const fetchCreativePursuits = async () => {
  try {
    // If Supabase client is not properly configured, return mock data
    if (!supabase) {
      console.warn("Supabase configuration not found, using mock data");
      return getMockCreativePursuits();
    }
    
    // Fetch all clients/projects
    const { data: clientData, error: clientError } = await supabase
      .from('creative_pursuits')
      .select('*')
      .order('order', { ascending: true });
      
    if (clientError) throw clientError;

    // For each client, fetch their media items
    const clientsWithMedia = await Promise.all(clientData.map(async (client) => {
      const { data: mediaData, error: mediaError } = await supabase
        .from('creative_pursuits_media')
        .select('*')
        .eq('client_id', client.id)
        .order('order', { ascending: true });
        
      if (mediaError) throw mediaError;
      
      return {
        ...client,
        media: mediaData
      };
    }));

    return clientsWithMedia;
  } catch (error) {
    console.error('Error fetching creative pursuits:', error);
    // Return mock data as fallback
    return getMockCreativePursuits();
  }
};

// Fetch services data from Supabase
export const fetchServices = async () => {
  try {
    // If Supabase client is not properly configured, return mock data
    if (!supabase) {
      console.warn("Supabase configuration not found, using mock data");
      return getMockServices();
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('id', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return mock data as fallback
    return getMockServices();
  }
};

// Fetch projects data from Supabase
export const fetchProjects = async () => {
  try {
    // If Supabase client is not properly configured, return mock data
    if (!supabase) {
      console.warn("Supabase configuration not found, using mock data");
      return getMockProjects();
    }
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return mock data as fallback
    return getMockProjects();
  }
};

// Fetch client logos from Supabase
export const fetchClients = async () => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    // Return mock data as fallback
    return getMockClients();
  }
};

// Mock data functions (fallbacks if Supabase connection fails)
const getMockCreativePursuits = () => {
  return [
    {
      id: 1,
      client: "DIGITAL MARTX",
      description: "Marketing agency specializing in digital advertising. Services provided: Motion Design, Animated Ads, Poster Design",
      media: [
        { 
          id: 1, 
          type: 'video', 
          title: 'Brand Animation',
          src: 'https://www.youtube.com/embed/abc123', // YouTube embedded URL
          thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-thumb1.jpg'
        },
        { 
          id: 2, 
          type: 'image', 
          title: 'Marketing Campaign Poster',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-poster1.jpg'
        },
        { 
          id: 3, 
          type: 'image', 
          title: 'Event Promotion Design',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-poster2.jpg'
        },
        { 
          id: 4, 
          type: 'video', 
          title: 'Social Media Ad',
          src: 'https://www.youtube.com/embed/def456', 
          thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1312461204/digital-martx-thumb2.jpg'
        }
      ]
    },
    {
      id: 2,
      client: "TECHNOVA",
      description: "Technology startup focusing on innovative solutions. Services provided: UI Animation, Product Videos, Presentation Design",
      media: [
        { 
          id: 5, 
          type: 'video', 
          title: 'UI Animation Demo',
          src: 'https://www.youtube.com/embed/ghi789',
          thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-thumb1.jpg'
        },
        { 
          id: 6, 
          type: 'image', 
          title: 'Investor Presentation',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-presentation1.jpg'
        },
        { 
          id: 7, 
          type: 'image', 
          title: 'Product Showcase Design',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-presentation2.jpg'
        },
        { 
          id: 8, 
          type: 'video', 
          title: 'Product Demo Video',
          src: 'https://www.youtube.com/embed/jkl012',
          thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1312461204/technova-thumb2.jpg'
        }
      ]
    },
    {
      id: 3,
      client: "PERSONAL EXPLORATIONS",
      description: "Experimental creative work and personal artistic projects",
      media: [
        { 
          id: 9, 
          type: 'image', 
          title: 'Abstract Composition',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-artwork1.jpg'
        },
        { 
          id: 10, 
          type: 'video', 
          title: 'Motion Design Experiment',
          src: 'https://www.youtube.com/embed/mno345',
          thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-thumb1.jpg'
        },
        { 
          id: 11, 
          type: 'image', 
          title: 'Digital Art Series',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-artwork2.jpg'
        },
        { 
          id: 12, 
          type: 'image', 
          title: 'Conceptual Photography',
          src: 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-artwork3.jpg'
        },
        { 
          id: 13, 
          type: 'video', 
          title: 'Experimental Animation',
          src: 'https://www.youtube.com/embed/pqr678',
          thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1312461204/personal-thumb2.jpg'
        }
      ]
    }
  ];
};

// Other mock data functions would be implemented similarly
const getMockServices = () => {
  // Mock services data
  return [];
};

const getMockProjects = () => {
  // Mock projects data
  return [];
};

const getMockClients = () => {
  // Mock clients data
  return [];
};
