import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogIn.module.css';
import { useAuth } from '../../context/AuthContext';

const LogIn = () => {
  const [action, setAction] = useState('Увійти');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/cabinet');
  };

  return (
    <div className={styles.container}>
      <form className={styles.login}>
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.inputs}>
          {action === 'Увійти' ? (
            <div></div>
          ) : (
            <div className={styles.input}>
              <img src="./images/person.png" alt="" />
              <input type="text" placeholder="Ім'я" />
            </div>
          )}

          <div className={styles.input}>
            <img src="./images/email.png" alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.input}>
            <img src="./images/password.png" alt="" />
            <input type="password" placeholder="Пароль" />
          </div>

          {action === 'Зареєструватися' ? (
            <div></div>
          ) : (
            <div className={styles.forgotPassword}>
              <span>Забули пароль?</span>
            </div>
          )}
          <div className={styles.submitContainer}>
            <div
              onClick={
                action === 'Увійти' ? handleLogin : () => setAction('Увійти')
              }
              className={`${action === 'Зареєструватися' ? `${styles.submit} ${styles.gray}` : styles.submit}`}
            >
              Увійти
            </div>
            <div
              onClick={
                action === 'Зареєструватися'
                  ? handleLogin
                  : () => setAction('Зареєструватися')
              }
              className={`${action === 'Увійти' ? `${styles.submit} ${styles.gray}` : styles.submit}`}
            >
              Зареєструватися
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;