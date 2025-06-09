// sputnik-frontend/src/components/ServicesSection.js
import React, { useState, useEffect } from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
    const [expandedService, setExpandedService] = useState(null);
    const [services, setServices] = useState([]); // <-- ДОБАВЛЕНО: Состояние для хранения услуг

    useEffect(() => {
        // <-- ДОБАВЛЕНО: Загрузка услуг при монтировании компонента
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/services'); // Запрос к бэкенду
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data); // Обновляем состояние услуг
            } catch (error) {
                console.error("Ошибка загрузки услуг:", error);
                // Можно добавить состояние ошибки для отображения пользователю
            }
        };

        fetchServices();
    }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании

    const handleServiceClick = (index) => {
        setExpandedService(expandedService === index ? null : index);
    };

    const scrollToForm = (serviceTitle) => {
        const formSection = document.getElementById('form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });

            const serviceInput = document.querySelector('input[name="message"]');
            if (serviceInput) {
                serviceInput.value = serviceTitle;
            }
        }
    };

    return (
        <section id="services" className="services-section">
            <h2>НАШИ УСЛУГИ</h2>
            <div className="services-grid">
                {services.length > 0 ? ( // <-- Проверяем, есть ли услуги
                    services.map((service, index) => (
                        <div
                            key={service.id || index} // Используем service.id как ключ, если есть
                            className="service-container"
                            onClick={() => handleServiceClick(index)}
                        >
                            <div className={`service-item ${expandedService === index ? 'active' : ''}`}>
                                <img src={service.image_url || '/images/default-service.jpg'} alt={service.title} /> {/* Используем image_url */}
                                <h3>{service.title}</h3>
                            </div>
                            <div
                                className={`service-description ${expandedService === index ? 'active' : ''}`}
                                dangerouslySetInnerHTML={{ __html: `<p>${service.description ? service.description.replace(/\n/g, '<br>') : ''}</p>` }}
                            />
                            {expandedService === index && (
                                <button
                                    className="service-order-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        scrollToForm(service.title);
                                    }}
                                >
                                    Выбрать услугу
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Загрузка услуг или услуги не найдены...</p> // <-- Сообщение, если услуг нет
                )}
            </div>
        </section>
    );
};

export default ServicesSection;