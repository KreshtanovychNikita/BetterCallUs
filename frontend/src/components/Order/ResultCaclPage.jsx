
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import styles from './ResultCaclPage.module.css';
import { useState } from "react";
import { fetchAllStats } from "../../context/FetchAllStats";

const ResultCalcPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { typeOfAd, typeOfDesc, typeOfCost , typeId } = state || {};
    const [formData, setFormData] = useState({
        adCount: 0,
        userCount: 0,
        adDuration: 0,
        productPrice: 0,
        productPriceWithoutAd: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const orderData = await fetchAllStats(formData, 6);
                console.log(orderData);
                if (orderData) {
                    // navigate('/calculating-result')
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Розрахунок типу реклами: {typeOfAd}</h1>
            </div>
            <NavLink to="/order" className={styles.link}>
                <button className={styles.button}> &#8592; Назад</button>
            </NavLink>
            <div className={styles.content}>
                <h4>Заповніть деталі для обчислення математичної моделі реклами</h4>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label htmlFor="adCount">Кількість реклам:</label>
                            <input
                                type="number"
                                id="adCount"
                                value={formData.adCount}
                                name="adCount"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="userCount">Кількість користувачів:</label>
                            <input
                                type="number"
                                id="userCount"
                                value={formData.userCount}
                                name="userCount"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="adDuration">Тривалість реклами в днях:</label>
                            <input
                                type="number"
                                id="adDuration"
                                value={formData.adDuration}
                                name="adDuration"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label htmlFor="productPrice">Ціна товару:</label>
                            <input
                                type="number"
                                step="0.01"
                                id="productPrice"
                                value={formData.productPrice}
                                name="productPrice"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="productPriceWithoutAd">Ціна товару без витрат на рекламу:</label>
                            <input
                                type="number"
                                step="0.01"
                                id="productPriceWithoutAd"
                                value={formData.productPriceWithoutAd}
                                name="productPriceWithoutAd"
                                className={styles.input}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <p className={styles.par}>Ціна акту реклами:</p>
                            <h4 className={styles.price}>{typeOfCost}</h4>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <p className={styles.description}>{typeOfDesc}</p>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <button type="submit" className={styles.btn}>
                            Розрахувати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResultCalcPage;
