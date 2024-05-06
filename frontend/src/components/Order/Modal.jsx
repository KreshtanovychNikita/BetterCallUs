import { NavLink } from 'react-router-dom';
import styles from './Modal.module.css';

const Modal = ({ message, onClose }) => {
  return (
    <div onClick={onClose} className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>{message}</h2>
        <NavLink to="/login">
          <button className={styles.button}>Увійти</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Modal;
