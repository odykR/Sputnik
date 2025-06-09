// src/admin/components/AdminHeader/AdminHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AdminHeader.css';

const AdminHeader = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogoClick = () => {
        logout(); // Сначала выполняем выход из системы
        navigate('/admin/login'); // Затем перенаправляем на страницу входа админа
    };

    return (
        <header className="admin-header">
            <div className="header-left">
                {/* Теперь эта кнопка будет отвечать за выход и перенаправление */}
                <button onClick={handleLogoClick} className="admin-home-button" aria-label="Выйти из системы и вернуться на страницу входа">
                    <div className="logo">
                        <img
                            src="/images/sputnik.png"
                            alt="Sputnik Logo"
                            className="default-logo"
                        />
                        <img
                            src="/images/logocol.png"
                            alt="Sputnik Logo Colored"
                            className="hover-logo"
                        />
                    </div>
                </button>
            </div>
            <div className="header-center">
                <h1>Административная панель</h1>
            </div>
            <div className="header-right">
                <div style={{ width: '100px' }}></div>
            </div>
        </header>
    );
};

export default AdminHeader;