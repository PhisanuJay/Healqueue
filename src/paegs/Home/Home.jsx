import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const stats = [
    {
      number: '20+',
      label: 'ประสบการณ์การทำงาน'
    },
    {
      number: '95%',
      label: 'การประเมินความพึงพอใจของผู้ป่วย'
    },
    {
      number: '5,000+',
      label: 'จำนวนผู้ป่วยที่ได้รับการดูแลดี'
    },
    {
      number: '10+',
      label: 'ทีมแพทย์และบุคลากรทางการแพทย์ที่มีคุณภาพ'
    }
  ];

  const departments = [
    {
      id: 1,
      thaiName: 'แผนกฉุกเฉิน',
      englishName: 'Emergency Department'
    },
    {
      id: 2,
      thaiName: 'แผนกกุมารเวชศาสตร์',
      englishName: 'Pediatric Department'
    },
    {
      id: 3,
      thaiName: 'สูตินรีเวช',
      englishName: 'Obstetrics and Gynecology Department'
    },
    {
      id: 4,
      thaiName: 'แผนกโรคหัวใจ',
      englishName: 'Cardiology Department'
    },
    {
      id: 5,
      thaiName: 'แผนกอายุรกรรมระบบ ประสาทและสมอง',
      englishName: 'Neurology Department'
    },
    {
      id: 6,
      thaiName: 'แผนกจิตเวชศาสตร์',
      englishName: 'Psychiatry Department'
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: 'โรงพยาบาลนี้ให้การรักษาที่ดีมาก แพทย์ให้คำแนะนำที่เหมาะสม ไม่บังคับให้ผ่าตัด และทีมกายภาพบำบัดสอนการออกกำลังกายที่ช่วยได้มาก เดินได้ง่ายขึ้นมาก',
      name: 'LAURENCE VENDETTA',
      location: 'แคลิฟอร์เนีย, สหรัฐอเมริกา',
      image: '/src/assets/Home pic/people girl 1.png'
    },
    {
      id: 2,
      quote: 'มาตรวจสุขภาพประจำปีที่นี่ สถานที่สะอาดทันสมัย พนักงานจัดตารางเวลาได้ดี ไม่ต้องรอนาน แพทย์ตรวจละเอียด ให้คำแนะนำเรื่องอาหารและการออกกำลังกาย คุ้มค่ามาก',
      name: 'PAULO HUBERT',
      location: 'นิวยอร์ก, สหรัฐอเมริกา',
      image: '/src/assets/Home pic/people men 1.png'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      image: '/src/assets/pic/image 22.png',
      date: '15 มีนาคม 2567',
      title: 'วิธีสังเกตุอาการมะเร็งต่อมลูกหมาก'
    },
    {
      id: 2,
      image: '/src/assets/pic/image 3.png',
      date: '5 สิงหาคม 2567',
      title: '"ปวดหลังเรื้อรัง"สัญญาณเตือนภัย ที่มากกว่าแค่เมื่อยล้า'
    },
    {
      id: 3,
      image: '/src/assets/pic/image 4.png',
      date: '24 กันยายน 2567',
      title: 'ความดันโลหิตสูงภัยเงียบที่ทำลายอวัยวะสำคัญ โดยไม่มีสัญญาณเตือน'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'โรงพยาบาลเปิดให้บริการวันและเวลากี่โมงบ้าง',
      answer: 'โรงพยาบาลของเราเปิดให้บริการทุกวัน 24 ชั่วโมง สำหรับแผนกฉุกเฉิน และแผนกผู้ป่วยนอกเปิดให้บริการทุกวันจันทร์-อาทิตย์ เวลา 08:00-20:00 น. สำหรับแผนกผู้ป่วยในสามารถเยี่ยมได้ทุกวัน เวลา 10:00-12:00 น. และ 17:00-19:00 น. หากมีคำถามเพิ่มเติมสามารถติดต่อได้ที่เบอร์ 02-XXX-XXXX'
    },
    {
      id: 2,
      question: 'ต้องเตรียมเอกสารอะไรบ้าง เมื่อเข้ารับการรักษาครั้งแรก',
      answer: 'สำหรับการเข้ารับการรักษาครั้งแรก กรุณาเตรียมเอกสารดังนี้: 1) บัตรประจำตัวประชาชนหรือหนังสือเดินทาง 2) บัตรประกันสังคมหรือบัตรประกันสุขภาพ (ถ้ามี) 3) เอกสารการรักษาเดิม (ถ้ามี) เช่น ผลตรวจเลือด, เอกสารจากโรงพยาบาลอื่น 4) รายการยาที่ใช้อยู่ปัจจุบัน 5) ข้อมูลประวัติการแพ้ยา (ถ้ามี) เพื่อความสะดวกและรวดเร็วในการให้บริการ'
    },
    {
      id: 3,
      question: 'สามารถเยี่ยมผู้ป่วยได้ช่วงเวลาไหนบ้าง',
      answer: 'โรงพยาบาลของเราอนุญาตให้เยี่ยมผู้ป่วยได้ทุกวัน โดยแบ่งเป็น 2 ช่วงเวลา: ช่วงเช้า เวลา 10:00-12:00 น. และช่วงเย็น เวลา 17:00-19:00 น. จำกัดผู้เยี่ยมไม่เกิน 2 คนต่อครั้ง และควรสวมหน้ากากอนามัยตลอดเวลา เพื่อความปลอดภัยของผู้ป่วยและผู้เยี่ยม หากต้องการเยี่ยมนอกเวลา กรุณาติดต่อพยาบาลประจำหอผู้ป่วยก่อน'
    },
    {
      id: 4,
      question: 'ต้องการนัดหมาย/เลื่อนนัดแพทย์ ต้องทำอย่างไร',
      answer: 'สามารถนัดหมายหรือเลื่อนนัดแพทย์ได้หลายช่องทาง: 1) โทรศัพท์ติดต่อที่เบอร์ 02-XXX-XXXX ในวันจันทร์-ศุกร์ เวลา 08:00-17:00 น. 2) ผ่านเว็บไซต์ของโรงพยาบาลที่หน้า "นัดหมายแพทย์" 3) แอปพลิเคชันของโรงพยาบาล 4) ติดต่อที่แผนกผู้ป่วยนอกโดยตรง กรุณาแจ้งล่วงหน้าอย่างน้อย 1 วันทำการ หากต้องการเลื่อนหรือยกเลิกนัด'
    },
    {
      id: 5,
      question: 'สามารถสอบถามค่ารักษาพยาบาลโดยประมาณ ก่อนการรักษาได้หรือไม่',
      answer: 'ได้ครับ โรงพยาบาลของเรามีบริการให้คำปรึกษาเรื่องค่ารักษาพยาบาลโดยประมาณก่อนการรักษา โดยสามารถติดต่อได้ที่แผนกการเงินหรือแผนกผู้ป่วยนอก เพื่อขอใบเสนอราคาเบื้องต้น ค่ารักษาจะขึ้นอยู่กับประเภทการรักษา, ยาที่ใช้, และระยะเวลาพักรักษาในโรงพยาบาล (ถ้ามี) สำหรับผู้ที่มีประกันสุขภาพ สามารถสอบถามเรื่องการเบิกจ่ายได้ที่แผนกประกันสุขภาพ'
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-background">
          <img src="/src/assets/pic/Home.png" alt="Hospital Background" className="bg-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          {/* Left Side - Text */}
          <div className="hero-left">
            <h1 className="hero-title">
              การดูแลด้วยความเข้าใจ<br />
              ผลลัพธ์ที่โดดเด่น
            </h1>
            <div className="hero-subtitle">
              <span className="subtitle-highlight">Bua luang</span>
              <p className="subtitle-description">
                ทีมแพทย์และผู้เชี่ยวชาญด้านสุขภาพของเรา<br />
                มุ่งมั่นในการรับบริการที่มีคุณภาพและการดูแลที่ใส่ใจในทุกระดับเช่นเดียวกับผู้ป่วย
              </p>
            </div>
          </div>

          {/* Right Side - Action Cards */}
          <div className="hero-right">
            <div className="action-card">
              <img src="/src/assets/logo/medical-assistanceก 1.png" alt="Find Doctor" className="action-icon-img" />
              <h3 className="action-title">Find Doctor</h3>
            </div>

            <div className="action-card">
              <img src="/src/assets/logo/Appointment 1.png" alt="Appointment" className="action-icon-img" />
              <h3 className="action-title">Appointment</h3>
            </div>
          </div>
        </div>

        {/* Stats Section - Overlapping */}
        <div className="stats-wrapper">
          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h2 className="stat-number">{stat.number}</h2>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            {/* Left Side - Text */}
            <div className="about-left">
              <span className="about-label">ABOUT US</span>
              <h2 className="about-title">Bualuang</h2>
              <h3 className="about-subtitle">
                รวมทีมแพทย์และบุคลากรผู้<br />
                เชี่ยวชาญมากประสบการณ์
              </h3>
              <p className="about-description">
                เราทุ่มเทเพื่อมอบบริการสุขภาพคุณภาพเยี่ยม โดยยึดมั่นในแนวทางการดูแลแบบองค์รวม 
                ซึ่งมุ่งเน้นการรักษาผู้ป่วยในทุกมิติ ไม่ใช่เพียงแค่อาการป่วยที่แสดงออกมา
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="about-right">
              <div className="about-image-wrapper">
                <img src="/src/assets/pic/image 1.png" alt="Medical Team" className="about-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section">
        <div className="departments-container">
          <div className="departments-header">
            <h2 className="departments-title">ศูนย์บริการเฉพาะทาง</h2>
            <p className="departments-subtitle">สำหรับสุขภาพที่ดีของคุณ</p>
          </div>
          
          <div className="departments-grid">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-background">
          <img src="/src/assets/Home pic/Background.png" alt="Testimonials Background" className="testimonials-bg-image" />
          <div className="testimonials-overlay"></div>
        </div>
        
          <div className="testimonials-container">
            <div className="testimonials-header">
              <span className="testimonials-label">TESTIMONIALS</span>
              <h2 className="testimonials-title">เสียงจากผู้ใช้บริการ</h2>
            </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-quote">
                  <span className="quote-mark">"</span>
                  <p>{testimonial.quote}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-avatar" />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-location">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <span className="blog-label">BLOG POSTS</span>
            <h2 className="blog-title">ข่าวสารล่าสุด</h2>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-image" />
                </div>
                <div className="blog-content">
                  <p className="blog-date">{post.date}</p>
                  <h3 className="blog-post-title">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-label">WHAT PEOPLE</span>
            <h2 className="faq-title">คำถามที่พบบ่อย</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`faq-item ${openFaq === faq.id ? 'active' : ''}`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="faq-question">
                  <span className="faq-question-text">{faq.question}</span>
                  <svg 
                    className={`faq-icon ${openFaq === faq.id ? 'rotated' : ''}`}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M6 9L12 15L18 9" 
                      stroke="#2c3e50" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {openFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const DepartmentCard = ({ department }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = isHovered 
    ? `/src/assets/Home logo/${department.id}W.png`
    : `/src/assets/Home logo/${department.id}.png`;

  return (
    <div 
      className={`department-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="department-icon">
        <img src={imageSrc} alt={department.thaiName} />
      </div>
      <div className="department-text">
        <h3 className="department-name">{department.thaiName}</h3>
        <p className="department-name-en">{department.englishName}</p>
      </div>
    </div>
  );
};

export default Home;