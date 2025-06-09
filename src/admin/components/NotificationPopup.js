import React, { useEffect, useState } from 'react';
import './NotificationPopup.css';

const NotificationPopup = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) {
                    onClose();
                }
            }, duration);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [message, duration, onClose]);

    if (!isVisible && !message) { // Не рендерим, если нет сообщения и не видим
        return null;
    }

    return (
        <div className={`notification-popup ${type} ${isVisible ? 'show' : ''}`}>
            <p>{message}</p>
        </div>
    );
};

export default NotificationPopup;