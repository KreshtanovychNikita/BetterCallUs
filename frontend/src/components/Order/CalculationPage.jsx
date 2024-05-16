import { useLocation, NavLink } from 'react-router-dom';
import styles from './CalculationPage.module.css';

const CalculationPage = () => {
  const location = useLocation();
  const { typeOfAd , typeId } = location.state || {};

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <h1>Розрахунок типу реклами: {typeOfAd}</h1>
        </div>
        <NavLink to="/order">
            <button className={styles.button}> &#8592; Назад</button>
      </NavLink>
    </div>
  );
};

export default CalculationPage;
