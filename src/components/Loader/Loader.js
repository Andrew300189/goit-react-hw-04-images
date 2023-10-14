import React, { useCallback, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = ({ onClose }) => {
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

  return (
    <div className={styles.loaderContainer}>
      <Audio
        type="Audio"
        color="green"
        height={80}
        width={80}
        radius={9}
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;