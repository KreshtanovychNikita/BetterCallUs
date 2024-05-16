import styles from './Item.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from './Modal';

const Item = ({ title, description, imageSrc, imageAlt, id, cost }) => {
  const [typeOfAd, setTypeOfAd] = useState('');
  const [typeOfDesc, setTypeOfDesc] = useState('');
  const [typeOfCost, setTypeOfCost] = useState('');
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

  const handleSelectAd = (type, desc, cost) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setShowModal(true);
      return;
    }
    setTypeOfAd(type);
    setTypeOfDesc(desc);
    setTypeOfCost(cost);
    navigate('/calculation', {
      state: { typeOfAd: type, typeOfDesc: desc, typeOfCost: cost },
    });
  };

  return (
    <div className={styles.adItem}>
      <div className={styles.adContainer}>
        <img className={styles.adImage} src={imageSrc} alt={imageAlt} />
        <div>
          <div className={styles.adList}>
            <h3 className={styles.adTitle}>{title}</h3>
            <h3 className={styles.adTitle}>{id}</h3>
            <img className={styles.ratingStar} src="./images/star.png" alt="" />
          </div>
          <div className={styles.description}>{description}</div>
          <button
            onClick={() => handleSelectAd(title, description, cost)}
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
