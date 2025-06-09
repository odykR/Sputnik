import React from 'react';
import './Certificate.css';

const Certificate = () => {
    return (
        <section id="certification" className="certificate-section">
            <div className="container">
                <div className="row">
                    <div className="col-left">
                        <h2 className="title-h1">Членство в НТПП</h2>
                        <div className="text">
                            <p>
                                Наша компания является официальным членом Новороссийской
                                Торгово-промышленной палаты, что подтверждает нашу надежность
                                и соответствие высоким профессиональным стандартам.
                            </p>
                        </div>
                        <a
                            href="https://novorossiysk.tpprf.ru/ru/member_list/?page=3&page_size=50"
                            className="btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Проверить
                        </a>
                    </div>
                    <div className="col-right">
                        <img
                            src="/images/NTPPLogo2.png"
                            alt="Членство в НТПП"
                            className="certificate-img"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificate;