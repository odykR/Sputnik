import React, { useState, useCallback } from 'react';
import AdminHeader from './components/AdminHeader';
import ServicesList from './components/ServicesList';
import ServiceFormModal from './components/ServiceFormModal';
import NotificationPopup from './components/NotificationPopup';
import './AdminPage.css';

const AdminPage = () => {
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [currentServiceForEdit, setCurrentServiceForEdit] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [refreshServices, setRefreshServices] = useState(0); // Новое состояние для принудительного обновления

    // Функция для открытия модалки в режиме добавления
    const handleAddService = () => {
        setCurrentServiceForEdit(null);
        setShowServiceModal(true);
    };

    // Функция для открытия модалки в режиме редактирования
    const handleEditService = (service) => {
        setCurrentServiceForEdit(service);
        setShowServiceModal(true);
    };

    // Функция для закрытия модалки
    const handleCloseServiceModal = () => {
        setShowServiceModal(false);
        setCurrentServiceForEdit(null);
    };

    // Функция для показа уведомления
    const showNotification = useCallback((message, type) => {
        setNotification({ message, type });
    }, []);

    // Функция, вызываемая после успешного сохранения в модалке
    const handleServiceSaveSuccess = (message, type) => {
        setShowServiceModal(false); // Закрываем модалку
        setCurrentServiceForEdit(null); // Очищаем данные редактирования
        showNotification(message, type); // Показываем уведомление
        setRefreshServices(prev => prev + 1); // Увеличиваем счетчик для принудительного обновления ServicesList
    };

    // Функция для сброса уведомления после его скрытия
    const handleNotificationClose = useCallback(() => {
        setNotification({ message: '', type: '' });
    }, []);

    return (
        <div className="admin-page-container">
            <AdminHeader />

            <main className="admin-main-content">
                <ServicesList
                    onAddService={handleAddService}
                    onEditService={handleEditService}
                    refreshTrigger={refreshServices} // Передаем триггер для обновления
                />

                {showServiceModal && (
                    <ServiceFormModal
                        currentService={currentServiceForEdit}
                        onClose={handleCloseServiceModal}
                        onSaveSuccess={handleServiceSaveSuccess}
                    />
                )}

                {notification.message && (
                    <NotificationPopup
                        message={notification.message}
                        type={notification.type}
                        onClose={handleNotificationClose}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminPage;