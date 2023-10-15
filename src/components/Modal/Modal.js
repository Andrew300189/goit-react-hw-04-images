import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, onClose }) => {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <img src={imageUrl} alt="Modal" />
      </div>
    </div>
  );
};

export default Modal;