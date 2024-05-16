import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './Cabinet.module.css';
import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import {ifLogin, IfLogin} from '../../context/IfLogin'
const Cabinet = () => {
    const { logout } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);


    useEffect( () => {
        async function getInfo (){
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {
                    const userData = await ifLogin(accessToken);
                    setUserData(userData)
                    console.log(userData)
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            } else {
                navigate('/login');
            }
        }
        getInfo()
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        navigate('/login');
    };

    if (!userData) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Особистий кабінет</h1>
            </div>
            <div className={styles.profile}>
                <div className={styles.info}>
                    <img src="./images/image.png" alt="" />
                    <div className={styles.details}>
                        <h3>Ім'я: {userData.nick_name}</h3>
                        <h3>Дата реєстрації: {userData.createdAt}</h3>
                        <h3>Ел. пошта: {userData.email}</h3>
                    </div>
                </div>
                <NavLink to="/orders">
                    <button className={styles.button}>Переглянути замовлення</button>
                </NavLink>
            </div>
            <button
                className={`${styles.button} ${styles.logoutButton}`}
                onClick={handleLogout}
            >
                Вийти
            </button>
        </div>
    );
};

export default Cabinet;
