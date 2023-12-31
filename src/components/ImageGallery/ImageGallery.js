import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.gallery}>
    {images.map((image) => (
      <ImageGalleryItem
        key={image.id}
        imageUrl={image.webformatURL}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    ))}
  </ul>
);

export default ImageGallery;
