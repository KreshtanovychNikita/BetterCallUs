import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img className={styles.logo} src="/images/logo.png" alt="Logo" />
      </NavLink>
      <nav className={styles.navigation}>
        <NavLink to="/">ГОЛОВНА</NavLink>
        <div className={styles.verticalLine}></div>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          ПРО НАС
        </NavLink>
        <div className={styles.verticalLine}></div>
        <NavLink
          to="/order"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          ЗАМОВИТИ
        </NavLink>
        <div className={styles.verticalLine}></div>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          КОНТАКТИ
        </NavLink>
        <div className={styles.verticalLine}></div>
        {isLoggedIn ? (
          <NavLink
            to="/cabinet"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            ОСОБИСТИЙ КАБІНЕТ
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            УВІЙТИ
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
