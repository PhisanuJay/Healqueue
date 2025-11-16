import React, { useState, useEffect } from 'react';
import HeroSlider from '../../components/HeroSlider'; 
import './Home.css';

const DUMMY_SLIDES = [
    { 
        image: '/src/assets/pic/home2.png', 
        alt: 'Slide 1' 
    },
    { 
        image: '/src/assets/pic/doctor.png', 
        alt: 'Slide 2' 
    },
    { 
        image: '/src/assets/pic/a-cinematic-photograph-of-a-caring-asian_PrqqOt8xSnKpw4qfmtsz-w_lOyRt7WXQOKbYgUocAwBpQ.png', 
        alt: 'Slide 3' 
    },
];

// ข้อมูลบริการ
const SERVICES = [
    {
        icon: '/src/assets/iconhospital/heart.png',
        title: 'โรคหัวใจและหลอดเลือด',
        description: 'ตรวจและรักษาโรคหัวใจด้วยเทคโนโลยีทันสมัย'
    },
    {
        icon: '/src/assets/iconhospital/bones.png',
        title: 'ออร์โธปิดิกส์',
        description: 'ศัลยกรรมกระดูกและข้อโดยผู้เชี่ยวชาญ'
    },
    {
        icon: '/src/assets/iconhospital/brain.png',
        title: 'ประสาทวิทยา',
        description: 'ตรวจรักษาโรคทางระบบประสาท'
    },
    {
        icon: '/src/assets/iconhospital/eye.png',
        title: 'จักษุวิทยา',
        description: 'ดูแลสุขภาพดวงตาครบวงจร'
    },
    {
        icon: '/src/assets/iconhospital/tooth.png',
        title: 'ทันตกรรม',
        description: 'บริการทันตกรรมครบวงจรทุกระดับ'
    },
    {
        icon: '/src/assets/iconhospital/pediatrics.png',
        title: 'กุมารเวชกรรม',
        description: 'ดูแลสุขภาพเด็กและวัยรุ่น'
    }
];

// ข้อมูลแพทย์แนะนำ
const FEATURED_DOCTORS = [
    {
        image: '/src/assets/logo/doctor/doctor1.png',
        name: 'นพ. สมชาย ใจดี',
        specialty: 'ศัลยแพทย์หัวใจ',
        experience: '15 ปี'
    },
    {
        image: '/src/assets/logo/doctor/doctor2.png',
        name: 'พญ. สุดา มั่นคง',
        specialty: 'กุมารแพทย์',
        experience: '12 ปี'
    },
    {
        image: '/src/assets/logo/doctor/doctor3.png',
        name: 'นพ. วิชัย เก่งกาจ',
        specialty: 'ออร์โธปิดิกส์',
        experience: '20 ปี'
    }
];

// ข้อมูลรีวิว
const TESTIMONIALS = [
    {
        name: 'คุณสมศรี',
        rating: 5,
        comment: 'บริการดีมาก แพทย์ใจเย็น พยาบาลดูแลดี รู้สึกอุ่นใจทุกครั้งที่มา',
        avatar: '/src/assets/avatars/avatar1.png'
    },
    {
        name: 'คุณประยุทธ์',
        rating: 5,
        comment: 'โรงพยาบาลสะอาด อุปกรณ์ทันสมัย ไม่ต้องรอนาน แนะนำเลยครับ',
        avatar: '/src/assets/avatars/avatar2.png'
    },
    {
        name: 'คุณวรรณา',
        rating: 5,
        comment: 'ประทับใจการบริการมาก ทุกคนยิ้มแย้มแจ่มใส จะกลับมาใช้บริการอีกแน่นอน',
        avatar: '/src/assets/avatars/avatar3.png'
    }
];

const Home = () => {
    const [showFloatingBtn, setShowFloatingBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowFloatingBtn(true);
            } else {
                setShowFloatingBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="home-container page-background-gradient">
            
            {/* Floating CTA Button */}
            <a 
                href="#booking" 
                className={`floating-cta ${showFloatingBtn ? 'show' : ''}`}
            >
                <span className="cta-icon">📅</span>
                <span className="cta-text">จองคิวเลย</span>
            </a>

            {/* ส่วน Welcome Message */}
            <div className="welcome-section">
                <h1 className="welcome-title">
                    ยินดีต้อนรับสู่โรงพยาบาลบัวหลวง
                </h1>
                <p className="welcome-subtitle">
                    มุ่งมั่นดูแลสุขภาพของคุณด้วยใจ พร้อมให้บริการด้วยมาตรฐานสากล
                </p>
            </div>

            {/* Content Area */}
            <div className="content-wrapper">
                {/* ส่วนที่ 1: กล่องลิงก์ด้านซ้าย */}
                <div className="quick-links">
                    
                    {/* 1. ค้นหาแพทย์ */}
                    <a href="#" className="link-box">
                        <div className="icon-wrapper">
                            <img 
                                src="/src/assets/logo/medical-assistanceก.png" 
                                alt="Doctor Icon" 
                                className="link-icon icon-normal" 
                            />
                            <img 
                                src="/src/assets/logo/medical-assistance.png" 
                                alt="Doctor Icon Hover" 
                                className="link-icon icon-hover" 
                            />
                        </div>
                        <strong>ค้นหาแพทย์</strong>
                        <span className="link-description">ค้นหาแพทย์ผู้เชี่ยวชาญ</span>
                    </a>

                    {/* 2. จองคิวพบแพทย์ */}
                    <a href="#" className="link-box">
                        <div className="icon-wrapper">
                            <img 
                                src="/src/assets/logo/calendar.png" 
                                alt="Calendar Icon" 
                                className="link-icon icon-normal" 
                            />
                            <img 
                                src="/src/assets/logo/calendarpink.png" 
                                alt="Calendar Icon Hover" 
                                className="link-icon icon-hover" 
                            />
                        </div>
                        <strong>จองคิวพบแพทย์</strong>
                        <span className="link-description">จองนัดหมายล่วงหน้า</span>
                    </a>

                    {/* 3. ติดต่อเรา */}
                    <a href="#" className="link-box">
                        <div className="icon-wrapper">
                            <img 
                                src="/src/assets/logo/call.png" 
                                alt="Call Icon" 
                                className="link-icon icon-normal" 
                            />
                            <img 
                                src="/src/assets/logo/callpink.png" 
                                alt="Call Icon Hover" 
                                className="link-icon icon-hover" 
                            />
                        </div>
                        <strong>ติดต่อเรา</strong>
                        <span className="link-description">สอบถามข้อมูลเพิ่มเติม</span>
                    </a>

                    {/* 4. เกี่ยวกับเรา */}
                    <a href="#" className="link-box">
                        <div className="icon-wrapper">
                            <img 
                                src="/src/assets/logo/open-book.png" 
                                alt="Book Icon" 
                                className="link-icon icon-normal" 
                            />
                            <img 
                                src="/src/assets/logo/open-bookpink.png" 
                                alt="Book Icon Hover" 
                                className="link-icon icon-hover" 
                            />
                        </div>
                        <strong>เกี่ยวกับเรา</strong>
                        <span className="link-description">รู้จักเรามากขึ้น</span>
                    </a>
                </div>

                {/* ส่วนที่ 2: สไลด์โชว์ด้านขวา */}
                <div className="hero-slider-area">
                    <HeroSlider slides={DUMMY_SLIDES} />
                </div>
            </div>


            {/* ส่วนบริการของเรา */}
            <section className="services-section">
                <h2 className="section-title">บริการของเรา</h2>
                <p className="section-subtitle">บริการทางการแพทย์ครบวงจร ด้วยทีมแพทย์ผู้เชี่ยวชาญ</p>
                
                <div className="services-grid">
                    {SERVICES.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                <img src={service.icon} alt={service.title} />
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* ส่วนแพทย์แนะนำ */}
            <section className="doctors-section">
                <h2 className="section-title">แพทย์แนะนำ</h2>
                <p className="section-subtitle">พบกับทีมแพทย์ผู้เชี่ยวชาญของเรา</p>
                
                <div className="doctors-grid">
                    {FEATURED_DOCTORS.map((doctor, index) => (
                        <div key={index} className="doctor-card">
                            <div className="doctor-image">
                                <img src={doctor.image} alt={doctor.name} />
                            </div>
                            <div className="doctor-info">
                                <h3 className="doctor-name">{doctor.name}</h3>
                                <p className="doctor-specialty">{doctor.specialty}</p>
                                <p className="doctor-experience">ประสบการณ์ {doctor.experience}</p>
                                <button className="doctor-btn">ดูรายละเอียด</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        
        </main>
    );
};

export default Home;