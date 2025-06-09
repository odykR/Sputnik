// src/admin/components/ServiceFormModal/ServiceFormModal.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './ServiceFormModal.css';

const ServiceFormModal = ({ currentService, onClose, onSaveSuccess }) => {
    const { authToken } = useAuth();
    const [form, setForm] = useState({ title: '', description: '' });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [clearImage, setClearImage] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (currentService) {
            setForm({
                title: currentService.title,
                description: currentService.description
            });
            setPreviewImage(currentService.image_url);
            setClearImage(false);
        } else {
            setForm({ title: '', description: '' });
            setImageFile(null);
            setPreviewImage(null);
            setClearImage(false);
        }
        setError(null);
    }, [currentService]);

    useEffect(() => {
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
        } else if (clearImage) {
            setPreviewImage(null);
        } else if (currentService && currentService.image_url) {
            setPreviewImage(currentService.image_url);
        } else {
            setPreviewImage(null);
        }
    }, [imageFile, currentService, clearImage]);

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setClearImage(false);
    };

    const handleClearImage = () => {
        setClearImage(true);
        setImageFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);

        if (imageFile) {
            formData.append('image', imageFile);
        } else if (clearImage) {
            formData.append('clear_image', 'true');
        } else if (currentService && currentService.image_url && !imageFile && !clearImage) {
        }

        const method = currentService ? 'PUT' : 'POST';
        const url = currentService
            ? `http://localhost:3001/api/services/${currentService.id}`
            : 'http://localhost:3001/api/services';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                    // Важно: При отправке FormData, Content-Type заголовок не должен быть установлен вручную.
                    // Браузер сам установит 'multipart/form-data' с правильным boundary.
                },
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMessage = result.errors && result.errors.length > 0
                    ? result.errors.map(err => err.msg).join(', ')
                    : result.message || 'Произошла ошибка при сохранении услуги.';
                throw new Error(errorMessage);
            }

            onSaveSuccess(result.message, 'success');
        } catch (err) {
            setError(err.message);
            console.error("Ошибка сохранения услуги:", err);
            onSaveSuccess(err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-modal-overlay" onClick={onClose}>
            <div className="form-modal-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="service-form">
                    <button type="button" className="close-modal-btn" onClick={onClose}>&times;</button>
                    <h3>{currentService ? 'Редактировать услугу' : 'Добавить новую услугу'}</h3>

                    {error && <p className="error-message">{error}</p>}

                    <div className="form-group">
                        <label htmlFor="title">Название услуги:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleFormChange}
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Изображение:</label>
                        {/* Изменения здесь: новый wrapper для input file и кнопки */}
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden-file-input" /* Скрываем дефолтный input */
                            />
                            <label htmlFor="image" className="custom-file-upload-btn">
                                Выберите файл
                            </label>
                            <span className="file-name-display">
                                {imageFile ? imageFile.name : (previewImage && !clearImage ? "Файл выбран" : "Файл не выбран")}
                            </span>
                        </div>


                        {previewImage && (
                            <div className="image-preview">
                                <p>Предварительный просмотр:</p>
                                <img src={previewImage} alt="Превью услуги" />
                                {((currentService && currentService.image_url) || imageFile) && !clearImage && (
                                    <button type="button" onClick={handleClearImage} className="delete-image-btn"> {/* Изменили класс */}
                                        Удалить изображение
                                    </button>
                                )}
                            </div>
                        )}
                        {(!previewImage && !imageFile && !clearImage) && (
                            <p className="no-image-message">Изображение не выбрано.</p>
                        )}
                        {clearImage && (
                            <p className="image-cleared-message">Изображение будет удалено при сохранении.</p>
                        )}
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-btn update-add-btn" disabled={isSubmitting}> {/* Добавили класс */}
                            {isSubmitting ? 'Сохранение...' : (currentService ? 'Обновить услугу' : 'Добавить услугу')}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="submit-btn cancel-btn"
                            disabled={isSubmitting}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceFormModal;