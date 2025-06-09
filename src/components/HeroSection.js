
import './HeroSection.css';

const HeroSection = () => {

    const handleScrollToCertification = () => {
        const element = document.getElementById('certification');
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="hero-section">
            <button
                className="scroll-button"
                onClick={handleScrollToCertification}
                aria-label="Прокрутить вниз"
            >
                <img
                    src="/images/arrow.png"
                    alt="Стрелка вниз"
                    className="scroll-arrow"
                />
            </button>
        </section>
    );
};

export default HeroSection;