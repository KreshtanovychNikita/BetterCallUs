import { NavLink } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './ResultCaclPage.module.css';

const ResultCalcPage = () => {
  const data = {
    labels: ['Покупці', 'Витрати', 'Дохід', 'Прибуток'],
    datasets: [
      {
        label: 'Розрахунок типу реклами',
        data: [24500, 58000, 70000, 120000],
        backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        // text: 'Математична модель для реклами',
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Розрахунок типу реклами</h1>
      </div>
      <div className={styles.desc}>
        <h4>Математична модель для реклами</h4>
        <div className={styles.data}>
          <div>
            <div className={styles.group}>
              <p>Реклама доцільна?</p>
              <h4 className={styles.text}>Так</h4>
            </div>

            <div className={styles.group}>
              <p>Оптимальна к-сть покупців</p>
              <h4 className={styles.text}>24500</h4>
            </div>
            <div className={styles.group}>
              <p>Т1</p>
              <h4 className={styles.text}>9.45</h4>
            </div>
          </div>
          <div>
            <div className={styles.group}>
              <p>Сумарні витрати</p>
              <h4 className={styles.text}>58000</h4>
            </div>
            <div className={styles.group}>
              <p>Сумарний дохід</p>
              <h4 className={styles.text}>70000</h4>
            </div>
            <div className={styles.group}>
              <p>Прибуток</p>
              <h4 className={styles.text}>120000</h4>
            </div>
          </div>
          <div className={styles.order}>
            <p>Ціна акту реклами</p>
            <h4 className={styles.price}>1000000</h4>
            <NavLink to="/payment">
              <button className={styles.button}>Замовити</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.chart}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ResultCalcPage;
