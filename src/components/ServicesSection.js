import React, { useState } from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
    const [expandedService, setExpandedService] = useState(null);

    const services = [
        {
            img: '/images/service1.jpg',
            title: 'Услуги по обработке информации',
            description: 'Сканирование и размещение первичных\n' +
                'документов в корпоративной информационной системе «Электронное хранилище документов»\n' +
                'на объекте заказчика'
        },
        {
            img: '/images/service2.jpg',
            title: 'Техническое обслуживание систем безопасности',
            description: 'Обеспечение эксплуатации и\n' +
                'техническое обслуживание исправных систем видеонаблюдения и контроля доступа'
        },
        {
            img: '/images/service3.jpg',
            title: 'Установка и обслуживание видеонаблюдения',
            description: 'Монтаж, настройка и постгарантийное обслуживание оборудования'
        },
        {
            img: '/images/service4.jpg',
            title: 'Клининг офисных помещений',
            description: 'Профессиональная уборка нежилых помещений и офисов, обеспечивающая чистоту и порядок в ваших рабочих пространствах'
        },
        {
            img: '/images/service5.jpg',
            title: 'Архивное дело',
            description: 'Сшивка и подготовка документации заказчика для сдачи в архив'
        },
        {
            img: '/images/service6.jpg',
            title: 'Бухгалтерские услуги',
            description: 'Полное бухгалтерское сопровождение индивидуальных\n' +
                'предпринимателей и ООО'
        },
        {
            img: '/images/service7.jpg',
            title: 'Транспортные услуги',
            description: 'Предоставление легкового автотранспорта с экипажем и спецтехники (в перспективе)'
        },
        {
            img: '/images/service8.jpg',
            title: 'Аренда катера с экипажем',
            description: '<span class="description-header">Характеристики:</span>\n\n' +
                '    - Тип и модель судна: Маломерное моторное судно EAGLE STAR CABIN 650;\n' +
                '    - Марка судна: SILVER;\n' +
                '    - Категория сложности района плавания: Категория сложности IV разряд III;\n' +
                '    - Страна постройки: Российская Федерация;\n' +
                '    - Год постройки: 2005;\n' +
                '    - Строительный идентификационный номер: RU-SLVU011YL506\n' +
                '    - Материал корпуса: Алюминиевый сплав;\n' +
                '    - Максимальная допустимая мощность двигателя: 88,2 кВт/л.с.\n' +
                '    - Количество водонепроницаемых отсеков: 5'
        }
        // ... остальные услуги
    ];

    const handleServiceClick = (index) => {
        setExpandedService(expandedService === index ? null : index);
    };

    return (
        <section className="services-section">
            <h2>НАШИ УСЛУГИ</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-container"
                        onClick={() => handleServiceClick(index)}
                    >
                        <div className={`service-item ${expandedService === index ? 'active' : ''}`}>
                            <img src={service.img} alt={service.title} />
                            <h3>{service.title}</h3>
                        </div>
                        <div
                            className={`service-description ${expandedService === index ? 'active' : ''}`}
                            dangerouslySetInnerHTML={{ __html: `<p>${service.description.replace(/\n/g, '<br>')}</p>` }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;