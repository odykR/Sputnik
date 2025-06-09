// sputnik-frontend/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Проверяем наличие токена при загрузке приложения
    const [authToken, setAuthToken] = useState(localStorage.getItem('adminToken'));

    // Функция для входа
    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem('adminToken', token); // Сохраняем токен в localStorage
    };

    // Функция для выхода
    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('adminToken'); // Удаляем токен из localStorage
    };

    // Проверяем, авторизован ли пользователь
    const isAuthenticated = !!authToken; // Преобразуем токен в булево значение

    // Проверяем токен при каждом рендере (можно улучшить с проверкой срока годности)
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token && token !== authToken) {
            setAuthToken(token);
        } else if (!token && authToken) {
            setAuthToken(null); // Если токен исчез из localStorage, сбрасываем состояние
        }
    }, [authToken]);


    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для удобного использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};