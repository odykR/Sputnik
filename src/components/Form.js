import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [modal, setModal] = useState({
        show: false,
        message: '',
        isSuccess: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3001/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            setModal({
                show: true,
                message: result.message || 'Данные отправлены менеджеру!',
                isSuccess: true
            });

            if (result.success) e.target.reset();
        } catch (error) {
            setModal({
                show: true,
                message: 'Ошибка отправки! Пожалуйста, попробуйте позже.',
                isSuccess: false
            });
            console.error(error);
        }
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setModal({...modal, show: false});
        }
    };


    return (
        <div id="form-section" className="form-container">
            <h2>ВЫ МОЖЕТЕ ОТПРАВИТЬ ЗАЯВКУ НАМ</h2>
            <p className="form-subtitle">НИЖЕ ПРЕДСТАВЛЕНА ФОРМА ДЛЯ ВЫБОРА УСЛУГИ</p>

            <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <input type="text" name="name" placeholder="ФИО" required />
                    </div>

                    <div className="form-group">
                    <input type="tel" name="phone" placeholder="Телефон" required />
                    </div>

                    <div className="form-group">
                    <input type="email" name="email" placeholder="E-mail" />
                    </div>

                    <div className="form-group">
                    <input type="communication" name="communication" placeholder="Предпочитаемый вид связи (Telegram/Email/WhatsApp)" />
                    </div>

                    <div className="form-group">
                    <input name="message" placeholder="Выбранная услуга"></input>
                    </div>

                    <button type="submit" className="submit-btn">Отправить заявку</button>

                    <p className="form-notice">
                    Нажимая на кнопку, я даю согласие на обработку персональных данных
                    </p>
            </form>

            {modal.show && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className={`modal-box ${modal.isSuccess ? 'success' : 'error'}`}>
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
                            <h3>{modal.isSuccess ? 'Успешно!' : 'Ошибка'}</h3>
                            <p>{modal.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;