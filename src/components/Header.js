import React from 'react';
import './Header.css';

const Header = () => {
    return (
            <div className="header-container">
                <header className="header">
                    <div className="logo">
                        {/* Основной логотип (по умолчанию) */}
                        <img
                            src="/images/sputnik.png"
                            alt="SputnikLogo"
                            className="default-logo"
                        />
                        {/* Логотип при наведении */}
                        <img
                            src="/images/logocol.png"
                            alt="SputnikLogo Colored"
                            className="hover-logo"
                        />
                    </div>
                    <nav className="menu">
                        <ul>
                            <li><a href="#about">О компании</a></li>
                            <li><a href="#services">Услуги</a></li>
                            <li><a href="#info">Информация</a></li>
                            <li><a href="#contacts">Контакты</a></li>
                        </ul>
                    </nav>
                    <div className="contact-info">
                        <span className="contact-item">
                            <img src="/images/sms.png" alt="Email" className="contact-icon" />
                            sputniknvr@gmail.com
                        </span>
                        <span className="contact-item">
                            <img src="/images/wtsup.png" alt="Phone" className="contact-icon" />
                            +7 (909) 447-83-82
                        </span>
                    </div>
                </header>
            </div>
    );
};

export default Header;