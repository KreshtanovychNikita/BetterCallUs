import styles from './Order.module.css';
import Item from './Item';
import { fetchAdTypes } from '../../context/AdTypes';
import { useEffect, useState } from 'react';

const Order = () => {
  const [adTypes, setAdTypes] = useState([]);

  useEffect(() => {
    async function fetchAdTypesFromBackend() {
      const data = await fetchAdTypes();
      setAdTypes(data);
    }

    fetchAdTypesFromBackend();
  }, []);

  return (
    <div className={styles.order}>
      <div className={styles.title}>
        <h1>Обрати тип реклами</h1>
      </div>
      <div className={styles.type}>
        <span>Оберіть тип реклами</span>
      </div>
      {adTypes.map((ad, index) => (
        <Item
          key={ad.id}
          title={ad.name}
          description={ad.description}
          imageSrc={ad.imageSrc}
          imageAlt={ad.imageAlt}
          cost={ad.ad_act_cost}
        />
      ))}
    </div>
  );
};

export default Order;
