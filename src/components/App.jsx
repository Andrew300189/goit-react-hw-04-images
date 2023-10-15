import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { getImages } from '../services/api';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      setImages([]);
      setQuery(query);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (imageUrl) => {
    setShowModal(true);
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageUrl('');
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() !== '') {
        setIsLoading(true);

        try {
          const data = await getImages(query, page);
          setImages((prevImages) => [...prevImages, ...data.hits]);
        } catch (error) {
          console.error('Error fetching images:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [query, page]);

  const shouldShowLoadMoreButton = images.length > 0 && query.trim() !== '';

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {showModal && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
      {shouldShowLoadMoreButton && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {isLoading && (
        <Loader
          type="Audio"
          height={80}
          width={80}
          radius={9}
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
    </div>
  );
}

export default App;
