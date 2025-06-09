// CoCompanies.js
import React from 'react';
import './CoCompanies.css';

const CoCompanies = () => {
    return (
        <section id="companies" className="companies-section" style={{ backgroundColor: '#356d8c' }}>
            <h2>НАШ ПАРТНЕР</h2>
            <h4>КОНСОРЦИУМ «ИННОВАЦИОННЫЕ СТРОИТЕЛЬНЫЕ ТЕХНОЛОГИИ»</h4>
            <div className="companies-container">
                    <div className="company-block">
                        <div className="company-logo">
                            <img src="/images/Grifon.png" alt="Новороссийская ТПП" />
                        </div>
                        <h3>МA "ГРИФОН"</h3>
                    </div>

                    <div className="company-block">
                        <div className="company-logo">
                            <img src="/images/ist.png" alt="Партнер 1" />
                        </div>
                        <h3>ООО "ИСТ-ИНЖИНИРИНГ"</h3>
                    </div>

                    <div className="company-block">
                        <div className="company-logo">
                            <img src="/images/tkgrifon.png" alt="Партнер 2" />
                        </div>
                        <h3>ООО ТК "Грифон"</h3>
                    </div>
                </div>
        </section>
    );
};

export default CoCompanies;