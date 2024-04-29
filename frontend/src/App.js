import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // імпортуємо CSS-файл для стилізації

function App() {
    const [message, setMessage] = useState('');
    const [authorization, setAuthorization] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3005/login', { email, password });
            setMessage(response.data.message);
            setAuthorization(true);
        } catch (error) {
            setMessage('Помилка авторизації');
        }
    };

    return (
        <div className="App">
            <h1 className="title">Простий фронтенд</h1>
            {authorization ? (
                <div>
                    <h2 className="status">Авторизовано</h2>
                    <p className="message">{message}</p>
                </div>
            ) : (
                <div>
                    <h2 className="status">Авторизація</h2>
                    <label>
                        Email:
                        <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button className="button" onClick={handleLogin}>Увійти</button>
                    <p className="message">{message}</p>
                </div>
            )}
        </div>
    );
}

export default App;
