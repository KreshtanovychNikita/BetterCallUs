import { useLocation, NavLink } from 'react-router-dom';
import styles from './CalculationPage.module.css';

const CalculationPage = () => {
  const location = useLocation();
  const { typeOfAd, typeOfDesc, typeOfCost } = location.state || {};

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Розрахунок типу реклами: {typeOfAd}</h1>
      </div>
      <NavLink to="/order">
        <button className={styles.button}> &#8592; Назад</button>
      </NavLink>
      <div className={styles.content}>
        <h4>Заповніть деталі для обчислення математичної моделі реклами</h4>
        <form className={styles.form}>
          <div className={styles.column}>
            <div className={styles.formGroup}>
              <label>К-сть реклами</label>
              <input type="number" name="adCount" />
            </div>
            <div className={styles.formGroup}>
              <label>К-сть користувачів</label>
              <input type="number" name="userCount" />
            </div>
            <div className={styles.formGroup}>
              <label>Тривалість реклами в днях</label>
              <input type="number" name="adDuration" />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.formGroup}>
              <label>Ціна товару</label>
              <input type="number" step="0.01" name="productPrice" />
            </div>
            <div className={styles.formGroup}>
              <label>Ціна товару без затрат на рекламу</label>
              <input type="number" step="0.01" name="productPriceWithoutAd" />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.formGroup}>
              <p className={styles.par}>Ціна акту реклами</p>
              <h4 className={styles.price}>10000</h4>
              <h4 className={styles.price}>{typeOfCost}</h4>
            </div>
          </div>
        </form>
        <div className={styles.desc}>
          <p className={styles.description}>{typeOfDesc}</p>
          <button type="submit" className={styles.btn}>
            Розрахувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculationPage;
