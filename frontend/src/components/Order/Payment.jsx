import { useState } from 'react';
import styles from './Payment.module.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    amount: '',
    fullName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cvv' && (isNaN(value) || value.length > 3)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Оплата</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Номер карти:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="expiryDate">Дата закінчення карти:</label>
              <input
                className={styles.short}
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                placeholder="MM/YY"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV:</label>
              <input
                className={styles.short}
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                maxLength="3"
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Пошта замовника:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Сума оплати:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">ПІБ замовника:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <button className={styles.button} type="submit">
          Оплатити
        </button>
      </form>
    </div>
  );
};

export default Payment;
