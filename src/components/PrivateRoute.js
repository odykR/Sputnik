// sputnik-frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // <-- Импортируем useAuth

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Получаем состояние аутентификации

    if (!isAuthenticated) {
        // Если пользователь не аутентифицирован, перенаправляем на главную страницу
        // Можно также перенаправить на специальную страницу входа, если она будет
        return <Navigate to="/" replace />;
    }

    return children; // Если пользователь аутентифицирован, рендерим дочерний компонент (AdminPage)
};

export default PrivateRoute;