// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = ({ onAdminButtonClick }) => { // Принимаем проп
    return (
        <footer className="footer">
            <p>© 2025 ООО "Спутник". Все права защищены.</p>
            {/* Кнопка, которая вызывает функцию openAdminModal из App.js */}
            <button onClick={onAdminButtonClick} className="admin-button">
                Для сотрудников
            </button>
        </footer>
    );
};

export default Footer;