import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Orders.module.css';
import OrdersTable from './OrdersTable';
import {allOrders} from "../../context/AllOrders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const data = await allOrders(accessToken);
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, []);

  return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Мої замовлення</h1>
        </div>
        <NavLink to="/cabinet">
          <button className={styles.button}> &#8592; Назад</button>
        </NavLink>
        {loading ? (
            <div className={styles.loading}>
              <h2>Завантаження...</h2>
            </div>
        ) : (
            orders.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Тип реклами</th>
                    <th>К-сть покупців</th>
                    <th>Прибуток</th>
                    <th>Ключ</th>
                    <th>Дата створення</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orders.map((order) => (
                      <OrdersTable
                          id={order.id}
                          type={order.ad_type}
                          buyers={order.number_of_buyers.toFixed(0)} // Вивести ціле число
                          profit={order.profit.toFixed(2)} // Вивести число з двома десятковими знаками
                          key={order.key} // Змініть ключ на id, якщо це унікальний ідентифікатор
                          date={new Date(order.createdAt).toLocaleString()} // Форматувати дату
                      />
                  ))}
                  </tbody>
                </table>
            ) : (
                <div className={styles.error}>
                  <h2>У Вас ще не було замовлень</h2>
                </div>
            )
        )}
      </div>
  );
};

export default Orders;
