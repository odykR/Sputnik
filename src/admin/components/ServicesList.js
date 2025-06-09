import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './ServicesList.css';

const ServicesList = ({ onAddService, onEditService, refreshTrigger }) => {
    const { authToken } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/api/services', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Ошибка при загрузке услуг.');
            }
            const data = await response.json();
            setServices(data);
        } catch (err) {
            setError(err.message);
            console.error("Ошибка загрузки услуг:", err);
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchServices();
    }, [authToken, refreshTrigger, fetchServices]);
    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
            return;
        }
        setError(null);
        try {
            const response = await fetch(`http://localhost:3001/api/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Ошибка при удалении услуги.');
            }
            fetchServices();
        } catch (err) {
            setError(err.message);
            console.error("Ошибка удаления услуги:", err);
        }
    };

    if (loading) {
        return <div className="loading-message">Загрузка услуг...</div>;
    }

    return (
        <div className="services-list-container">
            <h2>Список услуг</h2>

            {error && <p className="error-message">Ошибка: {error}</p>}

            {services.length === 0 ? (
                <p className="no-services-message">Услуг пока нет. Нажмите "Добавить услугу", чтобы начать.</p>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            <div className="service-content-wrapper">
                                <div className="service-text-content">
                                    <h4>{service.title}</h4>
                                    <p>{service.description}</p>
                                </div>
                                {service.image_url && (
                                    <div className="service-image-container">
                                        <img src={service.image_url} alt={service.title} className="service-image" />
                                    </div>
                                )}
                            </div>
                            <div className="action-buttons">
                                <button
                                    onClick={() => onEditService(service)}
                                    className="edit-btn"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="delete-btn"
                                >
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="add-service-section">
                <button
                    onClick={onAddService}
                    className="add-service-btn"
                >
                    Добавить услугу
                </button>
            </div>
        </div>
    );
};

export default ServicesList;