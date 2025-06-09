// sputnik-frontend/src/components/AdminAuthModal.js
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // <-- Импортируем useAuth
import './Form.css';

const AdminAuthModal = forwardRef((props, ref) => {
    const [modal, setModal] = useState({
        show: false,
        message: '',
        isSuccess: false
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // <-- Получаем функцию login из контекста

    useImperativeHandle(ref, () => ({
        showModal() {
            setModal({ show: true, message: '', isSuccess: false });
        },
        hideModal() {
            setModal({ show: false, message: '', isSuccess: false });
        }
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModal({ ...modal, message: '', isSuccess: false });

        try {
            const response = await fetch('http://81.94.150.135:3001/api/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                setModal({
                    show: true,
                    message: result.message || 'Вход выполнен успешно!',
                    isSuccess: true
                });
                login(result.token); // <-- Сохраняем токен через контекст
                setTimeout(() => {
                    setModal({ ...modal, show: false });
                    navigate('/admin');
                }, 1000);
            } else {
                setModal({
                    show: true,
                    message: result.message || 'Неверное имя пользователя или пароль.',
                    isSuccess: false
                });
            }
        } catch (error) {
            setModal({
                show: true,
                message: 'Ошибка соединения с сервером. Пожалуйста, попробуйте позже.',
                isSuccess: false
            });
            console.error('Ошибка входа администратора:', error);
        }
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setModal({...modal, show: false});
        }
    };

    if (!modal.show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button
                    className="modal-close-icon"
                    onClick={() => setModal({...modal, show: false})}
                    aria-label="Закрыть"
                >
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <div className="modal-content">
                    {modal.message && (
                        <div className="modal-icon">
                            {modal.isSuccess ? (
                                <svg viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                            )}
                        </div>
                    )}
                    <h3>{modal.isSuccess ? 'Вход выполнен!' : 'Вход для администратора'}</h3>
                    <p>{modal.message}</p>
                    {!modal.isSuccess && (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Имя пользователя"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">Войти</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
});

export default AdminAuthModal;