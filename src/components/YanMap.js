import React, { useState } from 'react';
import './YanMap.css';

const YanMap = () => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('sputniknvr@gmail.com')
            .then(() => {
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
            })
            .catch(err => console.error('Ошибка копирования:', err));
    };

    const copyPhone = () => {
        navigator.clipboard.writeText('+79094478382')
            .then(() => {
                setCopiedPhone(true);
                setTimeout(() => setCopiedPhone(false), 2000);
            })
            .catch(err => console.error('Ошибка копирования:', err));
    };

    document.querySelectorAll('.text-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const notification = this.querySelector('.copy-notification');
            if (notification) {
                notification.classList.add('active');
                setTimeout(() => {
                    notification.classList.remove('active');
                }, 2000);
            }
        });
    });

    return (
        <section id="YanMap" className="yanmap-wrapper">
            <div className="contacts-container">
                <div className="map-container">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A82ccf6eed91e51b717c73cb5422a7de568f357e28580650ec999362e1f45405a&amp;source=constructor"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Yandex Map"
                    ></iframe>
                </div>
                <div className="contacts-info">
                    <h2>КОНТАКТЫ</h2>
                    <div className="contacts-details">
                        <div className="contact-line">
                            <div className="icon-wrapper">
                                <img src="/images/home_con.png" alt="Адрес" className="contact-icon_yan" />
                            </div>
                            <p>Г. Новороссийск, ул. Набережная адмирала Серебрякова 19, помещение 39</p>
                        </div>

                        <div className="contact-line">
                            <div className="icon-wrapper">
                                <img src="/images/sms_con.png" alt="Email" className="contact-icon_yan" />
                            </div>
                            <div className="text-wrapper" onClick={copyEmail}>
                                <span className="hoverable-text">sputniknvr@gmail.com</span>
                                {copiedEmail && <span className="copy-notification">✓ Скопировано</span>}
                            </div>
                        </div>

                        <div className="contact-line">
                            <div className="icon-wrapper">
                                <img src="/images/phone_con.png" alt="Телефон" className="contact-icon_yan" />
                            </div>
                            <div className="text-wrapper" onClick={copyPhone}>
                                <span className="hoverable-text">+7 (909) 447-83-82</span>
                                {copiedPhone && <span className="copy-notification">✓ Скопировано</span>}
                            </div>
                        </div>

                        <div className="contact-line">
                            <div className="icon-wrapper">
                                <img src="/images/tele_con.png" alt="Телеграм" className="contact-icon_yan" />
                            </div>
                            <a href="https://t.me/Sputnik_nvrsk" target="_blank" rel="noopener noreferrer" className="hoverable-text">
                                @Sputnik_nvrsk
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default YanMap;