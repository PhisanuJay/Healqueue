import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">บริการ</h3>
                    <ul className="footer-links">
                        <li><a href="#">คุณภาพและความปลอดภัย</a></li>
                        <li><a href="#">ค้นหาแพทย์</a></li>
                        <li><a href="#">ทำบัตร</a></li>
                        <li><a href="#">แพ็กเกจอัปเดตโปรไฟล์ฉัน</a></li>
                        <li><a href="#">Your Healthcare Intelligence</a></li>
                        <li><a href="#">เทคโนโลยีของเรา</a></li>
                        <li><a href="#">สมาชิกบัตรสวัสดิการ</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3 className="footer-title">ข้อมูลเพื่อข้าบริการ</h3>
                    <ul className="footer-links">
                        <li><a href="#">หลังทำหัตถการ</a></li>
                        <li><a href="#">แผนที่</a></li>
                        <li><a href="#">การเดินทาง</a></li>
                        <li><a href="#">ประกัน</a></li>
                        <li><a href="#">สิ่งอำนวยความสะดวก</a></li>
                        <li><a href="#">ทั้งหมด</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3 className="footer-title">ข้อมูลสุขภาพ</h3>
                    <ul className="footer-links">
                        <li><a href="#">โรคและการรักษา</a></li>
                        <li><a href="#">ความปลอดภัยของคุณและครอบครัว</a></li>
                        <li><a href="#">ความรับผิดชอบต่อสังคม</a></li>
                        <li><a href="#">ร่างวัลและการยอมรับ</a></li>
                        <li><a href="#">ร่วมงานกับเรา</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3 className="footer-title">เกี่ยวกับเรา</h3>
                    <ul className="footer-links">
                        <li><a href="#">ข้อมูลโรงพยาบาล</a></li>
                        <li><a href="#">ข่าวสารและกิจกรรม</a></li>
                        <li><a href="#">ความรับผิดชอบต่อสังคม</a></li>
                        <li><a href="#">ร่างวัลและการยอมรับ</a></li>
                        <li><a href="#">ร่วมงานกับเรา</a></li>
                        <li><a href="#">บทความสัมพันธ์</a></li>
                        <li><a href="#">ติดต่อเรา</a></li>
                        <li><a href="#">บอร์ดสรรพทางการแพทย์</a></li>
                    </ul>
                </div>
                
                <div className="footer-section footer-contact">
                    <h3 className="footer-title">ติดต่อเรา</h3>
                    <div className="footer-address">
                        <p><strong>📍 2 ซ.สุมยง 7 ถ.เพชรบุรีตัดใหม่</strong></p>
                        <p>แขวงบางกะปิ แขวงห้วยขวาง</p>
                        <p>กรุงเทพฯ 10310 ประเทศไทย</p>
                    </div>
                    <div className="footer-contact-info">
                        <p>📞 <a href="tel:+6623103000">+66 2310 3000</a></p>
                        <p>📧 <a href="mailto:info@bualuanghospital.com">info@bualuanghospital.com</a></p>
                        <p>💬 <a href="#" target="_blank" rel="noopener noreferrer">Facebook Messenger</a></p>
                        <p>💚 <a href="#" target="_blank" rel="noopener noreferrer">LINE Official</a></p>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; 2025 โรงพยาบาลบัวหลวง. สงวนลิขสิทธิ์.</p>
                    <div className="footer-social">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="YouTube">📹</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;