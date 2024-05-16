import styles from './Item.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from './Modal';

const Item = ({ title, description, imageSrc, imageAlt , id}) => {
  const [typeOfAd, setTypeOfAd] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleSelectAd = (type , id) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setShowModal(true);
      return;
    }
    setTypeOfAd(type);
    navigate('/calculation', { state: { typeOfAd: type , typeId: id } });
  };

  return (
    <div className={styles.adItem}>
      <div className={styles.adContainer}>
        <img className={styles.adImage} src={imageSrc} alt={imageAlt} />
        <div>
          <div className={styles.adList}>
            <h3 className={styles.adTitle}>{title}</h3>
            <h3 className={styles.adTitle}>{id}</h3>
            <img className={styles.ratingStar} src="./images/star.png" alt=""/>
          </div>
          <div className={styles.description}>{description}</div>
          <button
            onClick={() => handleSelectAd(title , id)}
            className={styles.orderButton}
          >
            Замовити
          </button>
          {showModal && (
            <Modal
              message="Будь ласка, увійдіть в систему для замовлення."
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
