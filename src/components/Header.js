import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('sputniknvr@gmail.com')
            .then(() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy email: ', err);
            });
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header-container">
            <header className="header">
                <div className="logo">
                    <img
                        src="/images/sputnik.png"
                        alt="SputnikLogo"
                        className="default-logo"
                    />
                    <img
                        src="/images/logocol.png"
                        alt="SputnikLogo Colored"
                        className="hover-logo"
                    />
                </div>

                <nav className={`menu ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Услуги</a></li>
                        <li><a href="#info" onClick={(e) => { e.preventDefault(); scrollToSection('certification'); }}>Информация</a></li>
                        <li><a href="#contacts" onClick={(e) => { e.preventDefault(); scrollToSection('YanMap'); }}>Контакты</a></li>
                        <li><a href="#partners" onClick={(e) => { e.preventDefault(); scrollToSection('companies'); }}>Партнеры</a></li>
                    </ul>

                    <div className="mobile-contact">
                        <span className="contact-item" onClick={copyEmail} style={{cursor: 'pointer'}}>
                            sputniknvr@gmail.com
                        </span>
                        <span className="contact-item">
                            +7 (909) 447-83-82
                        </span>
                    </div>
                </nav>

                <div className="contact-info desktop-contact">
                    <span className="contact-item" onClick={copyEmail} style={{cursor: 'pointer'}}>
                        <img src="/images/sms.png" alt="Email" className="contact-icon" />
                        sputniknvr@gmail.com
                    </span>
                    <span
                        className="contact-item"
                        style={{cursor: 'pointer'}}
                        onClick={() => window.open('https://t.me/Sputnik_nvrsk', '_blank')}
                    >
                        <img src="/images/wtsup.png" alt="Phone" className="contact-icon" />
                        +7 (909) 447-83-82
                    </span>
                </div>

                <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                </div>
            </header>

            {showNotification && (
                <div className="notification">
                    Email скопирован в буфер обмена!
                </div>
            )}
        </div>
    );
};

export default Header;