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

// <div className={styles.order}>
//   <div className={styles.title}>
//     <h1>Обрати тип реклами</h1>
//   </div>
//   <div className={styles.type}>
//     <span>Оберіть тип реклами</span>
//   </div>
//   <div className={styles.adList}>
//     <div className={styles.adItem}>
//       <div className={styles.adContainer}>
//         <img className={styles.adImage} src="./images/target.png" alt="" />
//         <div>
//           <div className={styles.adList}>
//             <h3 className={styles.adTitle}>Таргет</h3>
//             <img
//               className={styles.ratingStar}
//               src="./images/star.png"
//               alt=""
//             />
//           </div>
//           <div className={styles.description}>
// Таргетована реклама — це метод просування товарів чи послуг у
// соціальних мережах, який дозволяє показувати рекламні оголошення
// вибірково, тільки цільовій аудиторії. Ця аудиторія визначається
// на підставі різних параметрів, таких як вік, стать, географічне
// розташування, інтереси, поведінка в інтернеті тощо.
//           </div>
//           <button className={styles.orderButton}>Замовити</button>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className={styles.adList}>
//     <div className={styles.adItem}>
//       <div className={styles.adContainer}>
//         <img className={styles.adImage} src="./images/voronka.png" alt="" />
//         <div>
//           <div className={styles.adList}>
//             <h3 className={styles.adTitle}>Воронки</h3>
//             <img
//               className={styles.ratingStar}
//               src="./images/star.png"
//               alt=""
//             />
//           </div>
//           <div className={styles.description}>
//             Воронка реклама — це стратегічний підхід у маркетингу, що
//             дозволяє підприємствам візуалізувати шлях клієнта від першого
//             знайомства з продуктом або послугою до фінальної покупки. Цей
//             інструмент допомагає залучати потенційних покупців і
//             перетворювати їх у реальних клієнтів за допомогою організованого
//             процесу, який включає кілька ключових етапів.
//           </div>
//           <button className={styles.orderButton}>Замовити</button>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className={styles.adList}>
//     <div className={styles.adItem}>
//       <div className={styles.adContainer}>
//         <img
//           className={styles.adImage}
//           src="./images/broshury.jpg"
//           alt=""
//         />
//         <div>
//           <div className={styles.adList}>
//             <h3 className={styles.adTitle}>Брошури</h3>
//             <img
//               className={styles.ratingStar}
//               src="./images/star.png"
//               alt=""
//             />
//           </div>
//           <div className={styles.description}>
// Брошура — це інструмент прямого маркетингу, що використовується
// для інформування та переконання потенційних клієнтів шляхом
// надання детальної інформації про продукти чи послуги компанії в
// атрактивному та зручному форматі. Вона може включати зображення,
// детальні описи, ціни та контактну інформацію, що робить її
// ідеальною для викладення переваг вашої пропозиції, спонукання до
// дії та підвищення впізнаваності бренду. Завдяки своїй візуальній
// привабливості та змістовному наповненню, брошури є ефективним
// способом досягнення широкої аудиторії, зберігаючи при цьому
// особистісний та професійний контакт з клієнтом.
//           </div>
//           <button className={styles.orderButton}>Замовити</button>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className={styles.adList}>
//     <div className={styles.adItem}>
//       <div className={styles.adContainer}>
//         <img className={styles.adImage} src="./images/video.jpg" alt="" />
//         <div>
//           <div className={styles.adList}>
//             <h3 className={styles.adTitle}>Відеоролики</h3>
//             <img
//               className={styles.ratingStar}
//               src="./images/star.png"
//               alt=""
//             />
//           </div>
//           <div className={styles.description}>
// Рекламні відеоролики — потужний інструмент цифрового маркетингу,
// який використовується для привертання уваги аудиторії,
// підвищення обізнаності про бренд та сприяння продажам через
// аудіовізуальне представлення інформації. Вони можуть
// демонструвати продукти чи послуги в дії, розповідати історії, що
// викликають емоційний зв'язок, та включати заклики до дії, що
// мотивує глядачів до взаємодії з брендом. Відеоролики ефективні у
// соціальних мережах, на телебаченні та в інтернеті, оскільки
// здатні швидко захопити увагу і передати повідомлення в
// компактній та динамічній формі. Цей формат реклами особливо
// важливий у сучасному світі швидкоплинних медіа, де здатність
// виділитися та зацікавити користувача є ключовою для успіху
// кампанії.
//           </div>
//           <button className={styles.orderButton}>Замовити</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

export default Order;
