import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import './Layout.css';

const Layout = () => {
    return (
        <div className="common-background">
            <Header />
            <HeroSection />
        </div>
    );
};

export default Layout;