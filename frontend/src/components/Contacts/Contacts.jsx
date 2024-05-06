
import styles from './Contacts.module.css';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Контакти</h1>
      </div>
      <div className={styles.section}>
        <div className={styles.item}>
          <h2>Телефон</h2>
          <p>
            <a href="tel:(0372) 58-48-80">(0372) 58-48-80</a>
          </p>
        </div>
        <div className={styles.item}>
          <h2>Графік роботи</h2>
          <div className={styles.date}>
            <p>пн-пт 08:20-20:40</p>
            <p>сб 08:20-20:40</p>
            <p>нд - вихідний</p>
          </div>
        </div>
        <div className={styles.item}>
          <h2>Ел. пошта</h2>
          <p>
            <a href="mailto:clg-math@chnu.edu.ua">clg-math@chnu.edu.ua</a>
          </p>
        </div>
      </div>
      <div className={styles.address}>
        <div className={styles.item}>
          <h2>Адреса офісу</h2>
          <p>м. Чернівці, вул. Університетська, 28</p>
        </div>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10617.993151256302!2d25.929342!3d48.2932673!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734089eaf308e41%3A0x974c4f797f290a9b!2z0KTQsNC60YPQu9GM0YLQtdGCINC80LDRgtC10LzQsNGC0LjQutC4INGC0LAg0ZbQvdGE0L7RgNC80LDRgtC40LrQuCDQp9Cd0KM!5e0!3m2!1suk!2sua!4v1714119726665!5m2!1suk!2sua"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
