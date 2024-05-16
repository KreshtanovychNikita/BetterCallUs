import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationContext = createContext();

export function useRegister() {
    return useContext(RegistrationContext);
}

export const RegistrationProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

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
        <RegistrationContext.Provider value={{ register }}>
            {children}
        </RegistrationContext.Provider>
    );
};