import React, { useState } from 'react';
import './HeroSlider.css'; // นำเข้าไฟล์ CSS สำหรับสไลเดอร์

// รับ props เป็น slides (array ของรูปภาพ)
const HeroSlider = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = slides.length;

    const nextSlide = () => {
        // ถ้าเป็นสไลด์สุดท้าย ให้วนกลับไป 0, 아니면 +1
        setCurrentSlide(current => (current === slidesCount - 1 ? 0 : current + 1));
    };

    const prevSlide = () => {
        // ถ้าเป็นสไลด์แรก ให้วนไปอันสุดท้าย, 아니면 -1
        setCurrentSlide(current => (current === 0 ? slidesCount - 1 : current - 1));
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    return (
        // .hero-slider-container คือตัวหลักที่จะดักจับ hover
        <div className="hero-slider-container">
            
            {/* ตัว wrapper ที่ใช้เลื่อนสไลด์ (ใช้ transform) */}
            <div 
                className="slides-wrapper"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div className="slide" key={index}>
                        <img src={slide.image} alt={slide.alt} />
                    </div>
                ))}
            </div>

            {/* 1. ปุ่มกดเลื่อนภาพ (ซ้าย/ขวา) */}
            <button className="slider-btn prev" onClick={prevSlide}>&#10094;</button>
            <button className="slider-btn next" onClick={nextSlide}>&#10095;</button>

            {/* 2. จุดบอกภาพ (Dots) */}
            <div className="slider-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;