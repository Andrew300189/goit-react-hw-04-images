import React, { useCallback } from 'react';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, onClose }) => {
  const handleCloseModalOnBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div className={styles.overlay} onClick={handleCloseModalOnBackdropClick}>
      <div className={styles.modal}>
        <img src={imageUrl} alt="Modal" />
      </div>
    </div>
  );
};

export default Modal;
