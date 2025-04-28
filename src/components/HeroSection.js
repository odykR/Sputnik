import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = () => {
    const truckRef = useRef(null);

    const handleScrollToCertification = () => {
        const element = document.getElementById('certification');
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, /* Отступ сверху */
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const currentTruckRef = truckRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-truck');
                }
            });
        }, { threshold: 0.1 });

        if (currentTruckRef) {
            observer.observe(currentTruckRef);
        }

        return () => {
            if (currentTruckRef) {
                observer.unobserve(currentTruckRef);
            }
        };
    }, []);

    return (
        <section className="hero-section">

            <button
                className="scroll-button"
                onClick={handleScrollToCertification}
            >
                «Спутник»
            </button>
        </section>
    );
};

export default HeroSection;