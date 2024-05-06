import { NavLink } from 'react-router-dom';
import styles from './Orders.module.css';
import OrdersTable from './OrdersTable';

const data = [
  {
    id: 3,
    name: 'Таргет',
    date: new Date(),
  },
  {
    id: 5,
    name: 'Воронки',
    date: new Date(),
  },
  {
    id: 2,
    name: 'Брошури',
    date: new Date(),
  },
  {
    id: 7,
    name: 'Відеоролики',
    date: new Date(),
  },
  {
    id: 9,
    name: 'Таргет',
    date: new Date(),
  },
];

// console.log(data[0].date.toLocaleString());
// console.log(data[0].date.toISOString());

const Orders = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Мої замовлення</h1>
      </div>
      <NavLink to="/cabinet">
        <button className={styles.button}> &#8592; Назад</button>
      </NavLink>
      {data.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <OrdersTable
                key={item.id}
                id={item.id}
                name={item.name}
                date={item.date.toLocaleDateString()}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.error}>
          <h2>У Вас ще не було замовлень</h2>
        </div>
      )}
    </div>
  );
};

export default Orders;
