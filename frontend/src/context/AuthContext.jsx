import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {// Отримуємо функцію навігації
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3005/registration/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // Обробити дані для входу
      if (data.login === true) {
        return data;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async ( email, nick_name, password) => {
    try {
      const response = await fetch('http://localhost:3005/registration/createNewUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,nick_name, password }),
      });
      const data = await response.json();
      if (data.email) {
        return true;
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
      <AuthContext.Provider value={{ login, register }}>
        {children}
      </AuthContext.Provider>
  );
};
