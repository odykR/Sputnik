import React from 'react';
import './YanMap.css';

const YanMap = () => {
    return (
        <div className="yanmap-wrapper">
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
                        <p>Г. Новороссийск, ул. Набережная адмирала Серебрякова 19, помещение 39</p>
                        <p>sputniknvr@gmail.com</p>
                        <p>Телефон для связи: +7 (909) 447-83-82</p>
                        <p>Тегеграм: @Sputnik-nvrsk</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YanMap;