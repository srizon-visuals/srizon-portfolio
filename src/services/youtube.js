// Extract YouTube video ID from various YouTube URL formats
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

// Generate YouTube embed URL from video ID or full URL
export const getYouTubeEmbedUrl = (videoIdOrUrl) => {
  // If it's already an embed URL, return as is
  if (videoIdOrUrl.includes('youtube.com/embed/')) {
    return videoIdOrUrl;
  }
  
  // If it's a video ID (11 characters), create embed URL
  if (videoIdOrUrl.length === 11 && !videoIdOrUrl.includes('/')) {
    return `https://www.youtube.com/embed/${videoIdOrUrl}`;
  }
  
  // Otherwise, extract ID from URL and create embed URL
  const videoId = getYouTubeVideoId(videoIdOrUrl);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Return null if invalid URL/ID
  return null;
};

// Generate YouTube thumbnail URL from video ID or full URL
export const getYouTubeThumbnailUrl = (videoIdOrUrl, quality = 'hqdefault') => {
  // Valid quality options: default, hqdefault, mqdefault, sddefault, maxresdefault
  const videoId = videoIdOrUrl.length === 11 ? videoIdOrUrl : getYouTubeVideoId(videoIdOrUrl);
  
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }
  
  return null;
};
