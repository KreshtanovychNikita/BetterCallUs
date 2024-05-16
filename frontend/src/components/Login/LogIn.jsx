import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogIn.module.css';
import { useAuth } from '../../context/AuthContext';
import { useRegister } from '../../context/RegistratoinContext';

const LogIn = () => {
  const [action, setAction] = useState('Увійти');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nick_name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { login } = useAuth();
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      navigate('/cabinet');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const accessToken = await login(email, password);
      if (!accessToken.login === true) {
        localStorage.setItem('accessToken', accessToken.accessToken);
        setIsLoggedIn(true);
        navigate('/cabinet');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegistration = async () => {
    try {
      const reg = await register(email, nick_name, password);
      console.log(reg);
      if (reg.token) {
        localStorage.setItem('accessToken', reg.token);
        setIsLoggedIn(true);
        navigate('/cabinet');
      }
    } catch (error) {
      console.error('Reg error:', error);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.login}>
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.inputs}>
          {action === 'Зареєструватися' && (
            <div className={styles.input}>
              <img src="./images/person.png" alt="" />
              <input
                type="name"
                value={nick_name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ім'я"
              />
            </div>
          )}

          <div className={styles.input}>
            <img src="./images/email.png" alt="" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className={styles.input}>
            <img src="./images/password.png" alt="" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </div>

          {action === 'Увійти' && (
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
                  ? handleRegistration
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
