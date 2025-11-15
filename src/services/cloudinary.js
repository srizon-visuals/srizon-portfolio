import { Cloudinary } from 'cloudinary-core';

// Create a Cloudinary instance
const cloudinaryCore = new Cloudinary({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
});

// Function to generate Cloudinary image URL with transformations
export const getCloudinaryImageUrl = (publicId, transformations = {}) => {
  return cloudinaryCore.url(publicId, transformations);
};

// Function to optimize image by device size
export const getResponsiveImageUrl = (publicId, width) => {
  return getCloudinaryImageUrl(publicId, {
    width,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  });
};

// Function to get a low-resolution placeholder image
export const getPlaceholderUrl = (publicId) => {
  return getCloudinaryImageUrl(publicId, {
    width: 50,
    quality: 10,
    blur: 1000,
  });
};
