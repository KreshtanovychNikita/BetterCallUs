import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './Cabinet.module.css';

const Cabinet = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Особистий кабінет</h1>
      </div>
      <div className={styles.profile}>
        <div className={styles.info}>
          <img src="./images/image.png" alt="" />
          <div className={styles.details}>
            <h3>Nickname</h3>
            <h3>Дата реєстрації:</h3>
            <h3>Ел. пошта: petrov@gmail.com</h3>
          </div>
        </div>
        <NavLink to="/orders">
          <button className={styles.button}>Переглянути замовлення</button>
        </NavLink>
      </div>
      <button
        className={`${styles.button} ${styles.logoutButton}`}
        onClick={handleLogout}
      >
        Вийти
      </button>
    </div>
  );
};

export default Cabinet;
