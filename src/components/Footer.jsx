import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    <div className="footer-brand-section">
                        <div className="footer-logo-wrapper">
                            <img src="/src/assets/logo/sdfdsf 3.png" alt="Bua Luang Hospital" className="footer-logo-img" />
                        </div>
                        <div className="footer-brand-content">
                            <h2 className="footer-brand-title">โรงพยาบาลบัวหลวง</h2>
                            <p className="footer-brand-tagline">การดูแลด้วยความเข้าใจ ผลลัพธ์ที่โดดเด่น</p>
                            <div className="footer-social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <div className="footer-column">
                            <h3 className="footer-column-title">บริการ</h3>
                            <ul className="footer-link-list">
                                <li><a href="#">คุณภาพและความปลอดภัย</a></li>
                                <li><a href="#">ค้นหาแพทย์</a></li>
                                <li><a href="#">ทำบัตร</a></li>
                                <li><a href="#">แพ็กเกจ</a></li>
                                <li><a href="#">เทคโนโลยีของเรา</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-column-title">ข้อมูลเพื่อบริการ</h3>
                            <ul className="footer-link-list">
                                <li><a href="#">หลังทำหัตถการ</a></li>
                                <li><a href="#">แผนที่</a></li>
                                <li><a href="#">การเดินทาง</a></li>
                                <li><a href="#">ประกัน</a></li>
                                <li><a href="#">สิ่งอำนวยความสะดวก</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-column-title">ข้อมูลสุขภาพ</h3>
                            <ul className="footer-link-list">
                                <li><a href="#">โรคและการรักษา</a></li>
                                <li><a href="#">ความปลอดภัย</a></li>
                                <li><a href="#">ความรับผิดชอบต่อสังคม</a></li>
                                <li><a href="#">รางวัลและการยอมรับ</a></li>
                            </ul>
                        </div>

                        <div className="footer-column footer-contact-column">
                            <h3 className="footer-column-title">ติดต่อเรา</h3>
                            <div className="contact-info">
                                <div className="contact-line">
                                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <div>
                                        <p>2 ซ.สุมยง 7 ถ.เพชรบุรีตัดใหม่</p>
                                        <p>แขวงบางกะปิ แขวงห้วยขวาง กรุงเทพฯ 10310</p>
                                    </div>
                                </div>
                                <div className="contact-line">
                                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    <a href="tel:+6623103000">+66 2310 3000</a>
                                </div>
                                <div className="contact-line">
                                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    <a href="mailto:info@bualuanghospital.com">info@bualuanghospital.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <p className="copyright">&copy; 2025 โรงพยาบาลบัวหลวง. สงวนลิขสิทธิ์.</p>
                        <div className="footer-legal-links">
                            <a href="#">นโยบายความเป็นส่วนตัว</a>
                            <span className="separator">•</span>
                            <a href="#">ข้อกำหนดการใช้งาน</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
