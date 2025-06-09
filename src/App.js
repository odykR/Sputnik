// sputnik-frontend/src/App.js
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорты всех компонентов главной страницы
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Certificate from './components/Certificate';
import CoCompanies from "./components/CoCompanies";
import ServicesSection from './components/ServicesSection';
import YanMap from './components/YanMap';
import Form from './components/Form';
import Footer from './components/Footer';
import Layout from './components/Layout';
import ScrollToTopButton from './components/ScrollToTopButton'; // Проверь правильность имени файла, было "ScrollToToButton" в предыдущем

// Импортируем компоненты для админки и защиты маршрута
import AdminPage from './admin/AdminPage';
import AdminAuthModal from './components/AdminAuthModal';
import PrivateRoute from './components/PrivateRoute'; // <-- ДОБАВЛЕНО: Импортируем PrivateRoute

import './styles/global.css';

const HomePage = ({ openAdminModal }) => {
    return (
        <>
            <Layout>
                <Header />
                <HeroSection />
            </Layout>
            <ScrollToTopButton />
            <Certificate id="certification" />
            <CoCompanies />
            <ServicesSection />
            <YanMap />
            <Form />
            <Footer onAdminButtonClick={openAdminModal} />
        </>
    );
};

function App() {
    const adminModalRef = useRef(null);

    const openAdminModal = () => {
        if (adminModalRef.current) {
            adminModalRef.current.showModal();
        }
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage openAdminModal={openAdminModal} />}
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>

                <AdminAuthModal ref={adminModalRef} />
            </div>
        </Router>
    );
}

export default App;