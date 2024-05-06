import { NavLink } from 'react-router-dom';
import styles from './MainSection.module.css';

const MainSection = () => {
  return (
    <main>
      <img className={styles.mainLogo} src="/images/bettercallus.png" alt="" />
      <NavLink to="/order">
        <button className={styles.button}>Обрати вид реклами</button>
      </NavLink>
      <div className={styles.bottomLine}></div>
    </main>
  );
};

export default MainSection;
