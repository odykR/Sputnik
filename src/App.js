import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Certificate from './components/Certificate';
import ServicesSection from './components/ServicesSection';
import YanMap from './components/YanMap';
import Footer from './components/Footer';
import Layout from './components/Layout';
import './styles/global.css';


function App() {
    return (
        <div className="app">
            {/* Layout содержит только компоненты с общим фоном */}
            <Layout>
                <Header /> {/* Header теперь ВНУТРИ Layout */}
                <HeroSection /> {/* HeroSection теперь ВНУТРИ Layout */}
            </Layout>
            {/* Компоненты БЕЗ общего фона идут после Layout */}
            <Certificate id="certification"/>
            <ServicesSection />
            <YanMap />
            <Footer />
        </div>
    );
}

export default App;