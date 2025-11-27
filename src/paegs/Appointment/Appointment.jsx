import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointment.css';
import { medicalDatabase, findMedicalInfo, findDoctors } from '../../data/medicalData';
// Import body part images
import headImg from '../../assets/appointment/head.png';
import neckImg from '../../assets/appointment/neck.png';
import chestImg from '../../assets/appointment/chest.png';
import abdomenImg from '../../assets/appointment/abdomen.png';
import armImg from '../../assets/appointment/arm.png';
import handImg from '../../assets/appointment/hando.png';
import legImg from '../../assets/appointment/leg.png';
import footImg from '../../assets/appointment/foot.png';
import genitalsImg from '../../assets/appointment/sexual organ.png';

const Appointment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  const [doctorSelection, setDoctorSelection] = useState('');
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: เลือกส่วน, 2: เลือกอาการ, 3: แสดงแพทย์
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [recommendedInfo, setRecommendedInfo] = useState(null);
  const [autoSelectedDoctors, setAutoSelectedDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorCurrentPage, setDoctorCurrentPage] = useState(1);
  const doctorsPerPage = 9;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Patient information states
  const [patientPrefix, setPatientPrefix] = useState('คุณ');
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientDateOfBirth, setPatientDateOfBirth] = useState('');
  const [patientNationality, setPatientNationality] = useState('');
  const [patientIdCard, setPatientIdCard] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientConsent, setPatientConsent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('promptpay');

  const bodyParts = [
    { id: 'head', name: 'หัว', image: headImg },
    { id: 'neck', name: 'คอ', image: neckImg },
    { id: 'chest', name: 'หน้าอก', image: chestImg },
    { id: 'stomach', name: 'ท้อง', image: abdomenImg },
    { id: 'arm', name: 'แขน', image: armImg },
    { id: 'hand', name: 'มือ', image: handImg },
    { id: 'leg', name: 'ขา', image: legImg },
    { id: 'foot', name: 'เท้า', image: footImg },
    { id: 'genitals', name: 'อวัยวะเพศ', image: genitalsImg }
  ];

  // อาการตามส่วนของร่างกาย
  const getSymptomsByBodyPart = (bodyPartId) => {
    const symptomsMap = {
      head: [
        { id: 'headache', name: 'ปวดหัว' },
        { id: 'dizzy', name: 'เวียนหัว' },
        { id: 'fever', name: 'มีไข้' },
        { id: 'numb-head', name: 'มึนหัว' },
        { id: 'heavy-head', name: 'หัวหนัก' }
      ],
      neck: [
        { id: 'neck-pain', name: 'เจ็บคอ' },
        { id: 'stiff-neck', name: 'คอแข็ง' },
        { id: 'swollen-neck', name: 'คอบวม' },
        { id: 'difficulty-swallow', name: 'กลืนลำบาก' }
      ],
      chest: [
        { id: 'chest-pain', name: 'เจ็บหน้าอก' },
        { id: 'heartbeat', name: 'ใจสั่น' },
        { id: 'tight-chest', name: 'แน่นหน้าอก' },
        { id: 'difficulty-breath', name: 'หายใจลำบาก' },
        { id: 'cough', name: 'ไอ' }
      ],
      stomach: [
        { id: 'stomach-pain', name: 'เจ็บท้อง' },
        { id: 'diarrhea', name: 'ท้องเสีย' },
        { id: 'constipation', name: 'ท้องผูก' },
        { id: 'nausea', name: 'คลื่นไส้' },
        { id: 'bloating', name: 'ท้องอืด' }
      ],
      arm: [
        { id: 'arm-pain', name: 'ปวดแขน' },
        { id: 'arm-numb', name: 'ชาแขน' },
        { id: 'arm-weak', name: 'แขนอ่อนแรง' },
        { id: 'arm-swollen', name: 'แขนบวม' }
      ],
      hand: [
        { id: 'hand-pain', name: 'ปวดมือ' },
        { id: 'hand-numb', name: 'ชามือ' },
        { id: 'hand-itchy', name: 'คันมือ' },
        { id: 'hand-swollen', name: 'มือบวม' }
      ],
      leg: [
        { id: 'leg-pain', name: 'ปวดขา' },
        { id: 'leg-numb', name: 'ชาขา' },
        { id: 'leg-weak', name: 'ขาอ่อนแรง' },
        { id: 'leg-swollen', name: 'ขาบวม' }
      ],
      foot: [
        { id: 'foot-pain', name: 'ปวดเท้า' },
        { id: 'foot-numb', name: 'ชาเท้า' },
        { id: 'foot-swollen', name: 'เท้าบวม' },
        { id: 'foot-itchy', name: 'คันเท้า' }
      ],
      genitals: [
        { id: 'genital-pain', name: 'เจ็บ' },
        { id: 'genital-itchy', name: 'คัน' },
        { id: 'genital-discharge', name: 'มีตกขาว/น้ำออก' },
        { id: 'genital-burning', name: 'แสบร้อน' }
      ]
    };
    return symptomsMap[bodyPartId] || [];
  };

  const steps = [
    { number: 1, label: 'เริ่มต้น' },
    { number: 2, label: 'ข้อมูลการนัด' },
    { number: 3, label: 'ข้อมูลผู้ป่วย' },
    { number: 4, label: 'ตรวจสอบข้อมูล' },
    { number: 5, label: 'การชำระเงิน' }
  ];

  const handleNext = () => {
    // Step 1: ตรวจสอบว่ามีการเลือกประเภทการนัด
    if (currentStep === 1 && !appointmentType) {
      return;
    }

    // Step 2: ตรวจสอบว่ามีการเลือกวันที่และเวลา
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      return;
    }

    // Step 3: ตรวจสอบว่ามีการกรอกข้อมูลผู้ป่วยครบถ้วน
    if (currentStep === 3) {
      if (!patientFirstName || !patientLastName || !patientGender || 
          !patientDateOfBirth || !patientNationality || !patientIdCard || 
          !patientPhone || !patientEmail || !patientConsent) {
        return;
      }
    }

    // Step 5: ยืนยันการจอง
    if (currentStep === 5) {
      handleConfirmBooking();
      return;
    }

    // ไปขั้นตอนถัดไป
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleConfirmBooking = () => {
    // แสดง animation
    setShowSuccessAnimation(true);
    
    // หลังจาก 2 วินาที redirect ไปหน้า Home
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


  const handleReset = () => {
    setCurrentStep(1);
    setAppointmentType('');
    setDoctorSelection('');
    setShowSymptomModal(false);
    setShowDoctorModal(false);
    setModalStep(1);
    setSelectedBodyPart('');
    setSelectedSymptom('');
    setRecommendedDoctors([]);
    setRecommendedInfo(null);
    setAutoSelectedDoctors([]);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime('');
    setCurrentMonth(new Date());
    setPatientPrefix('คุณ');
    setPatientFirstName('');
    setPatientLastName('');
    setPatientGender('');
    setPatientDateOfBirth('');
    setPatientNationality('');
    setPatientIdCard('');
    setPatientPhone('');
    setPatientEmail('');
    setPatientConsent(false);
    setPaymentMethod('promptpay');
  };

  const handleBodyPartClick = (partId) => {
    setSelectedBodyPart(partId);
    setModalStep(2); // ไปขั้นตอนเลือกอาการ
  };

  const handleSymptomClick = (symptomId) => {
    setSelectedSymptom(symptomId);
    // วิเคราะห์และแสดงแพทย์
    analyzeAndRecommend();
  };

  const analyzeAndRecommend = () => {
    const bodyPartName = bodyParts.find(bp => bp.id === selectedBodyPart)?.name || '';
    const availableSymptoms = getSymptomsByBodyPart(selectedBodyPart);
    const symptomName = availableSymptoms.find(s => s.id === selectedSymptom)?.name || '';
    const symptomText = `${bodyPartName} ${symptomName}`.trim();
    
    // ค้นหาข้อมูลอาการ
    const symptomInfo = findMedicalInfo(symptomText);
    
    if (symptomInfo && symptomInfo.type === 'symptom') {
      // หาแพทย์ที่แนะนำ
      const doctors = findDoctors(symptomInfo.department, symptomInfo.symptom);
      const allDoctors = findDoctors(symptomInfo.department);
      const doctorsToShow = doctors.length > 0 ? doctors : allDoctors.slice(0, 3);
      
      setRecommendedInfo(symptomInfo);
      setRecommendedDoctors(doctorsToShow);
    } else {
      // ถ้าไม่พบอาการเฉพาะ ให้แนะนำแพทย์ตามส่วนของร่างกาย
      let department = 'แผนกอายุรกรรม';
      let doctorType = 'อายุรแพทย์';
      
      // แนะนำแผนกตามส่วนของร่างกาย
      if (selectedBodyPart === 'head') {
        department = 'แผนกอายุรกรรมระบบประสาทและสมอง';
        doctorType = 'แพทย์ระบบประสาทและสมอง';
      } else if (selectedBodyPart === 'chest') {
        department = 'แผนกโรคหัวใจ';
        doctorType = 'แพทย์โรคหัวใจ';
      } else if (selectedBodyPart === 'stomach') {
        department = 'ศัลยกรรมทั่วไป';
        doctorType = 'ศัลยแพทย์';
      } else if (selectedBodyPart === 'genitals') {
        department = 'สูตินรีเวช';
        doctorType = 'สูตินรีแพทย์';
      }
      
      setRecommendedInfo({
        department: department,
        doctorType: doctorType,
        description: `อาการ${symptomName}ที่${bodyPartName}`,
        advice: 'แนะนำให้พบแพทย์เพื่อรับการตรวจวินิจฉัยที่ถูกต้อง'
      });
      
      const doctors = findDoctors(department);
      setRecommendedDoctors(doctors.slice(0, 3));
    }
    
    setModalStep(3); // ไปขั้นตอนแสดงแพทย์
  };

  const handleCloseModal = () => {
    setShowSymptomModal(false);
    setModalStep(1);
    setSelectedBodyPart('');
    setSelectedSymptom('');
    // ไม่ reset recommendedDoctors และ recommendedInfo เพื่อให้แสดงด้านล่าง
  };

  const handleConfirmSelection = () => {
    // เมื่อยืนยันการเลือก ให้เก็บแพทย์ที่แนะนำไว้ใน autoSelectedDoctors
    if (recommendedDoctors.length > 0 && recommendedInfo) {
      const doctorsWithDept = recommendedDoctors.map(doctor => ({
        ...doctor,
        department: recommendedInfo.department
      }));
      setAutoSelectedDoctors(doctorsWithDept);
    }
    setShowSymptomModal(false);
    setModalStep(1);
    setSelectedBodyPart('');
    setSelectedSymptom('');
  };

  const loadAllDoctors = () => {
    // โหลดแพทย์ทั้งหมดจากทุกแผนก
    const allDoctors = [];
    Object.keys(medicalDatabase.doctors).forEach(dept => {
      const doctors = medicalDatabase.doctors[dept];
      if (doctors) {
        doctors.forEach(doctor => {
          allDoctors.push({ ...doctor, department: dept });
        });
      }
    });
    setAutoSelectedDoctors(allDoctors);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    // สามารถเพิ่ม logic เพิ่มเติมได้ เช่น บันทึกการเลือก, ไปหน้าถัดไป, etc.
    console.log('Selected doctor:', doctor);
  };

  const handleCloseDoctorModal = () => {
    setShowDoctorModal(false);
  };

  const handleConfirmDoctorSelection = () => {
    setShowDoctorModal(false);
  };

  // Filter doctors based on search query
  const filteredDoctors = autoSelectedDoctors.filter(doctor => {
    if (!doctorSearchQuery.trim()) {
      return true;
    }
    const query = doctorSearchQuery.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query) ||
      doctor.department.toLowerCase().includes(query) ||
      doctor.expertise.some(exp => exp.toLowerCase().includes(query))
    );
  });

  // Pagination for doctors
  const totalDoctorPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const doctorStartIndex = (doctorCurrentPage - 1) * doctorsPerPage;
  const doctorEndIndex = doctorStartIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(doctorStartIndex, doctorEndIndex);

  const handleDoctorPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalDoctorPages) {
      setDoctorCurrentPage(newPage);
    }
  };

  const handleBackToBodyPart = () => {
    setModalStep(1);
    setSelectedBodyPart('');
    setSelectedSymptom('');
  };

  const handleBackToSymptom = () => {
    setModalStep(2);
    setSelectedSymptom('');
    setRecommendedDoctors([]);
    setRecommendedInfo(null);
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    
    return date < today || date > oneMonthLater;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date) => {
    if (date && !isDateDisabled(date)) {
      setSelectedDate(date);
    }
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const formatMonthYear = (date) => {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  const formatDayName = (dayIndex) => {
    const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
    return days[dayIndex];
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    if (!date) return '';
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  // Time slots
  const morningSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'
  ];
  
  const afternoonSlots = [
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
  ];

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        {/* Header */}
        <div className="appointment-header">
          <h1 className="appointment-title">ทำนัด</h1>
        </div>

        {/* Progress Indicator */}
        <div className="progress-container">
          {steps.map((step, index) => (
            <div key={step.number} className="progress-step-wrapper">
              <div
                className={`progress-step ${
                  step.number === currentStep
                    ? 'active'
                    : step.number < currentStep
                    ? 'completed'
                    : ''
                }`}
              >
                {step.number < currentStep ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#ffffff"/>
                  </svg>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`progress-label ${
                  step.number === currentStep ? 'active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1 Content */}
        {currentStep === 1 && (
          <div className="step-content">
            {/* Section 1: Appointment Type */}
            <div className="form-section">
              <div className="option-grid">
                <div
                  className={`option-card ${appointmentType === 'doctor' ? 'selected' : ''}`}
                  onClick={() => setAppointmentType('doctor')}
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value="doctor"
                    checked={appointmentType === 'doctor'}
                    onChange={() => setAppointmentType('doctor')}
                  />
                  <span className="option-text">นัดหมายแพทย์</span>
                  <svg className="option-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8L10 10M14 8L16 10M8 16L10 14M14 16L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div
                  className={`option-card ${appointmentType === 'health-check' ? 'selected' : ''}`}
                  onClick={() => setAppointmentType('health-check')}
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value="health-check"
                    checked={appointmentType === 'health-check'}
                    onChange={() => setAppointmentType('health-check')}
                  />
                  <span className="option-text">ตรวจสุขภาพ</span>
                  <svg className="option-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Section 2: Doctor Selection - Show immediately when appointmentType is 'doctor' */}
            {appointmentType === 'doctor' && (
              <>
                <div className="form-section">
                  <h3 className="section-title">เลือกแพทย์</h3>
                  <div className="option-grid">
                    <div
                      className={`option-card ${doctorSelection === 'select-for-me' ? 'selected' : ''}`}
                      onClick={() => {
                        setDoctorSelection('select-for-me');
                        // โหลดรายชื่อแพทย์ทั้งหมด
                        loadAllDoctors();
                        setShowSymptomModal(true);
                      }}
                    >
                      <input
                        type="radio"
                        name="doctorSelection"
                        value="select-for-me"
                        checked={doctorSelection === 'select-for-me'}
                        onChange={() => setDoctorSelection('select-for-me')}
                      />
                      <span className="option-text">
                        แนะนำแพทย์ให้ฉัน
                        {selectedDoctor && doctorSelection === 'select-for-me' && (
                          <span className="option-subtext">{selectedDoctor.name}</span>
                        )}
                      </span>
                      <svg className="option-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                        <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div
                      className={`option-card ${doctorSelection === 'choose-myself' ? 'selected' : ''}`}
                      onClick={() => {
                        setDoctorSelection('choose-myself');
                        // รีเซ็ตข้อมูลของ "เลือกแพทย์ให้ฉัน"
                        setSelectedDoctor(null);
                        setAutoSelectedDoctors([]);
                        setShowSymptomModal(false);
                        setModalStep(1);
                        setSelectedBodyPart('');
                        setSelectedSymptom('');
                        setRecommendedDoctors([]);
                        setRecommendedInfo(null);
                        // เปิด modal เลือกแพทย์
                        loadAllDoctors();
                        setShowDoctorModal(true);
                      }}
                    >
                      <input
                        type="radio"
                        name="doctorSelection"
                        value="choose-myself"
                        checked={doctorSelection === 'choose-myself'}
                        onChange={() => {
                          setDoctorSelection('choose-myself');
                          // รีเซ็ตข้อมูลของ "เลือกแพทย์ให้ฉัน"
                          setSelectedDoctor(null);
                          setAutoSelectedDoctors([]);
                          setShowSymptomModal(false);
                          setModalStep(1);
                          setSelectedBodyPart('');
                          setSelectedSymptom('');
                          setRecommendedDoctors([]);
                          setRecommendedInfo(null);
                          // เปิด modal เลือกแพทย์
                          loadAllDoctors();
                          setShowDoctorModal(true);
                        }}
                      />
                      <span className="option-text">
                        ฉันต้องการเลือกแพทย์เอง
                        {selectedDoctor && doctorSelection === 'choose-myself' && (
                          <span className="option-subtext">{selectedDoctor.name}</span>
                        )}
                      </span>
                      <svg className="option-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 18.01L12.01 17.9989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>
        )}

        {/* Step 2 Content: Date and Time Selection */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="form-section">
              <h3 className="section-title">วันที่และเวลา</h3>
              
              {/* Calendar */}
              <div className="calendar-container">
                <div className="calendar-header">
                  <button 
                    className="calendar-nav-btn" 
                    onClick={handlePrevMonth}
                    disabled={(() => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                      const firstDayOfDisplayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                      // Disable ถ้าเดือนที่แสดงอยู่ <= เดือนปัจจุบัน
                      return firstDayOfDisplayMonth.getTime() <= firstDayOfCurrentMonth.getTime();
                    })()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h4 className="calendar-month-year">{formatMonthYear(currentMonth)}</h4>
                  <button 
                    className="calendar-nav-btn" 
                    onClick={handleNextMonth}
                    disabled={(() => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const oneMonthLater = new Date(today);
                      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
                      const firstDayOfNextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                      const firstDayOfOneMonthLater = new Date(oneMonthLater.getFullYear(), oneMonthLater.getMonth(), 1);
                      // Disable ถ้าเดือนถัดไป >= เดือนที่อนุญาต (1 เดือนจากวันนี้)
                      return firstDayOfNextMonth.getTime() > firstDayOfOneMonthLater.getTime();
                    })()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <div className="calendar-grid">
                  {/* Day headers */}
                  {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day, index) => (
                    <div key={index} className="calendar-day-header">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {getDaysInMonth(currentMonth).map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="calendar-day empty"></div>;
                    }
                    
                    const isDisabled = isDateDisabled(date);
                    const isSelected = isDateSelected(date);
                    const isToday = date.toDateString() === new Date().toDateString();
                    
                    return (
                      <button
                        key={date.toISOString()}
                        className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                        onClick={() => handleDateClick(date)}
                        disabled={isDisabled}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="time-selection-container">
                <h4 className="time-section-title">เลือกเวลา</h4>
                
                {/* Morning Slots */}
                <div className="time-period-section">
                  <h5 className="time-period-title">ช่วงเช้า</h5>
                  <div className="time-slots-grid">
                    {morningSlots.map((time) => (
                      <button
                        key={time}
                        className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div className="time-period-section">
                  <h5 className="time-period-title">ช่วงบ่าย</h5>
                  <div className="time-slots-grid">
                    {afternoonSlots.map((time) => (
                      <button
                        key={time}
                        className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Content: Patient Information */}
        {currentStep === 3 && (
          <div className="step-content">
            <div className="form-section">
              <h3 className="section-title">ข้อมูลผู้ป่วย</h3>
              
              <div className="patient-form-grid">
                {/* Row 1 */}
                <div className="form-field">
                  <label>คำนำหน้า</label>
                  <select
                    className="form-input"
                    value={patientPrefix}
                    onChange={(e) => setPatientPrefix(e.target.value)}
                  >
                    <option value="คุณ">คุณ</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                    <option value="เด็กชาย">เด็กชาย</option>
                    <option value="เด็กหญิง">เด็กหญิง</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>ชื่อ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={patientFirstName}
                    onChange={(e) => setPatientFirstName(e.target.value)}
                    placeholder="กรุณากรอกชื่อ"
                  />
                </div>
                <div className="form-field">
                  <label>นามสกุล</label>
                  <input
                    type="text"
                    className="form-input"
                    value={patientLastName}
                    onChange={(e) => setPatientLastName(e.target.value)}
                    placeholder="กรุณากรอกนามสกุล"
                  />
                </div>

                {/* Row 2 */}
                <div className="form-field">
                  <label>เพศ</label>
                  <select
                    className="form-input"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>วันเกิด</label>
                  <input
                    type="date"
                    className="form-input"
                    value={patientDateOfBirth}
                    onChange={(e) => setPatientDateOfBirth(e.target.value)}
                  />
                </div>

                {/* Row 3 */}
                <div className="form-field">
                  <label>สัญชาติ</label>
                  <select
                    className="form-input"
                    value={patientNationality}
                    onChange={(e) => setPatientNationality(e.target.value)}
                  >
                    <option value="">เลือกสัญชาติ</option>
                    <option value="ไทย">ไทย</option>
                    <option value="อเมริกัน">อเมริกัน</option>
                    <option value="อังกฤษ">อังกฤษ</option>
                    <option value="จีน">จีน</option>
                    <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>เลขบัตรประชาชน</label>
                  <input
                    type="text"
                    className="form-input"
                    value={patientIdCard}
                    onChange={(e) => setPatientIdCard(e.target.value)}
                    placeholder="กรุณากรอกเลขบัตรประชาชน"
                    maxLength="13"
                  />
                </div>

                {/* Row 4 */}
                <div className="form-field">
                  <label>เบอร์โทรศัพท์</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  />
                </div>
                <div className="form-field">
                  <label>อีเมล</label>
                  <input
                    type="email"
                    className="form-input"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="กรุณากรอกอีเมล"
                  />
                </div>
              </div>

              {/* Consent Text */}
              <div className="consent-section">
                <label className="consent-checkbox">
                  <input
                    type="checkbox"
                    checked={patientConsent}
                    onChange={(e) => setPatientConsent(e.target.checked)}
                  />
                  <span className="consent-text">
                    ข้าพเจ้ายินยอมโดยสมัครใจให้คณะแพทย์ พยาบาล, เจ้าหน้าที่ และ/หรือ บุคลากรอื่น ๆ ในทีมสุขภาพของโรงพยาบาล ทำการตรวจรักษา และกระทำการใด ๆ ตามหลักวิชาชีพทางการแพทย์ เปิดเผยข้อมูลการตรวจรักษาของข้าพเจ้าให้แก่ทีมสุขภาพของโรงพยาบาล ที่เกี่ยวข้อง ซึ่งมีความจำเป็นในการเข้าถึงข้อมูลของข้าพเจ้า ทั้งนี้ข้าพเจ้าได้รับทราบถึง คำประกาศสิทธิของผู้ป่วย และ นโยบายความเป็นส่วนตัว เป็น อย่างดีแล้ว
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 Content: Review Information */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="form-section">
              <h3 className="section-title">ตรวจสอบข้อมูล</h3>
              
              <div className="review-table-container">
                <table className="review-table">
                  <thead>
                    <tr>
                      <th className="review-table-header">รายการ</th>
                      <th className="review-table-header">ข้อมูล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Appointment Type */}
                    <tr className="review-table-row">
                      <td className="review-table-label">ประเภทการนัด</td>
                      <td className="review-table-value">
                        {appointmentType === 'doctor' ? 'นัดหมายแพทย์' : appointmentType === 'health-check' ? 'ตรวจสุขภาพ' : '-'}
                      </td>
                    </tr>

                    {/* Doctor Information */}
                    {appointmentType === 'doctor' && selectedDoctor && (
                      <>
                        <tr className="review-table-row">
                          <td className="review-table-label">ชื่อแพทย์</td>
                          <td className="review-table-value">{selectedDoctor.name || '-'}</td>
                        </tr>
                        {selectedDoctor.department && (
                          <tr className="review-table-row">
                            <td className="review-table-label">แผนก</td>
                            <td className="review-table-value">{selectedDoctor.department}</td>
                          </tr>
                        )}
                        {selectedDoctor.specialization && (
                          <tr className="review-table-row">
                            <td className="review-table-label">ความชำนาญ</td>
                            <td className="review-table-value">{selectedDoctor.specialization}</td>
                          </tr>
                        )}
                      </>
                    )}

                    {/* Appointment Date & Time */}
                    <tr className="review-table-row">
                      <td className="review-table-label">วันที่</td>
                      <td className="review-table-value">{selectedDate ? formatDateDisplay(selectedDate) : '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">เวลา</td>
                      <td className="review-table-value">{selectedTime || '-'}</td>
                    </tr>

                    {/* Patient Information */}
                    <tr className="review-table-row">
                      <td className="review-table-label">คำนำหน้า</td>
                      <td className="review-table-value">{patientPrefix || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">ชื่อ</td>
                      <td className="review-table-value">{patientFirstName || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">นามสกุล</td>
                      <td className="review-table-value">{patientLastName || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">เพศ</td>
                      <td className="review-table-value">{patientGender || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">วันเกิด</td>
                      <td className="review-table-value">
                        {patientDateOfBirth 
                          ? formatDateDisplay(new Date(patientDateOfBirth)) 
                          : '-'}
                      </td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">สัญชาติ</td>
                      <td className="review-table-value">{patientNationality || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">เลขบัตรประชาชน</td>
                      <td className="review-table-value">{patientIdCard || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">เบอร์โทรศัพท์</td>
                      <td className="review-table-value">{patientPhone || '-'}</td>
                    </tr>
                    <tr className="review-table-row">
                      <td className="review-table-label">อีเมล</td>
                      <td className="review-table-value">{patientEmail || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 Content: Payment */}
        {currentStep === 5 && (
          <div className="step-content">
            <div className="form-section">
              <h3 className="section-title">การชำระเงิน</h3>
              
              <div className="payment-container">
                <div className="payment-info">
                  <p className="payment-description">กรุณาเลือกวิธีการชำระเงิน</p>
                  
                  {/* Payment Method Selection */}
                  <div className="payment-methods">
                    {/* PromptPay / QR Code */}
                    <div className="payment-method-card">
                      <div className="payment-method-header">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="promptpay"
                          id="promptpay"
                          checked={paymentMethod === 'promptpay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="promptpay" className="payment-method-label">
                          <span className="payment-method-name">ธนาคาร QR Code (พร้อมเพย์)</span>
                        </label>
                      </div>
                      {paymentMethod === 'promptpay' && (
                        <div className="payment-qr-container">
                          {/* Placeholder for QR Code - จะใส่ไฟล์จากเพื่อนทีหลัง */}
                          <div className="qr-placeholder">
                            <p>QR Code จะแสดงที่นี่</p>
                            <p className="qr-placeholder-note">(รอไฟล์จากเพื่อน)</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Credit Card */}
                    <div className="payment-method-card">
                      <div className="payment-method-header">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="creditcard"
                          id="creditcard"
                          checked={paymentMethod === 'creditcard'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="creditcard" className="payment-method-label">
                          <span className="payment-method-name">บัตรเครดิต</span>
                        </label>
                      </div>
                      {paymentMethod === 'creditcard' && (
                        <div className="payment-form-container">
                          <div className="payment-form-placeholder">
                            <p>ฟอร์มชำระเงินด้วยบัตรเครดิต</p>
                            <p className="qr-placeholder-note">(รอการพัฒนา)</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Social Security */}
                    <div className="payment-method-card">
                      <div className="payment-method-header">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="socialsecurity"
                          id="socialsecurity"
                          checked={paymentMethod === 'socialsecurity'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="socialsecurity" className="payment-method-label">
                          <span className="payment-method-name">ประกันสังคม</span>
                        </label>
                      </div>
                      {paymentMethod === 'socialsecurity' && (
                        <div className="payment-form-container">
                          <div className="payment-form-placeholder">
                            <p>ข้อมูลประกันสังคม</p>
                            <p className="qr-placeholder-note">(รอการพัฒนา)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <div className="nav-buttons-left">
            {currentStep > 1 && (
              <button className="btn-back-step" onClick={handleBack}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ย้อนกลับ
              </button>
            )}
            <button className="btn-reset" onClick={handleReset}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              เริ่มใหม่
            </button>
          </div>
          <button 
            className="btn-next" 
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !appointmentType) ||
              (currentStep === 2 && (!selectedDate || !selectedTime)) ||
              (currentStep === 3 && (!patientFirstName || !patientLastName || !patientGender || 
                !patientDateOfBirth || !patientNationality || !patientIdCard || 
                !patientPhone || !patientEmail || !patientConsent)) ||
              (currentStep === 4 && false) // Step 4 ไม่มี disabled condition
            }
          >
            {currentStep === 3 ? (
              <>
                ส่งข้อมูล
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            ) : currentStep === 5 ? (
              <>
                ยืนยันการจอง
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            ) : (
              <>
                ต่อไป
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Warning Message */}
        <div className="warning-message">
          <p>
            การนัดหมายนี้ไม่สามารถใช้ในผู้ป่วยฉุกเฉิน หรือนัดหมายแพทย์ในวันเดียวกัน สำหรับกรณีฉุกเฉินทางการแพทย์ กรุณาติดต่อ{' '}
            <a href="tel:1724" className="emergency-link">1724 (ฉุกเฉิน)</a>
          </p>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <a href="#" className="footer-link">เงื่อนไขการให้บริการ</a>
          <span className="separator">|</span>
          <a href="#" className="footer-link">คำประกาศสิทธิของผู้ป่วย</a>
        </div>
      </div>

      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="success-animation-overlay">
          <div className="success-animation-container">
            <div className="success-checkmark">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2 className="success-title">จองสำเร็จ!</h2>
            <p className="success-message">กำลังกลับไปหน้าแรก...</p>
          </div>
        </div>
      )}

      {/* Doctor Selection Modal */}
      {showDoctorModal && (
        <div className="modal-overlay" onClick={handleCloseDoctorModal}>
          <div className="modal-content doctor-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>เลือกแพทย์</h2>
              <button className="modal-close" onClick={handleCloseDoctorModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              {/* Search Bar */}
              <div className="search-section">
                <div className="search-bar-wrapper">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="ค้นหาชื่อบุคลากรณ์ทางการแพทย์"
                    value={doctorSearchQuery}
                    onChange={(e) => {
                      setDoctorSearchQuery(e.target.value);
                      setDoctorCurrentPage(1);
                    }}
                  />
                  <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              {/* Doctors Grid */}
              <div className="doctors-grid-modal">
                {currentDoctors.length > 0 ? (
                  currentDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`doctor-card-modal-find ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                      onClick={() => handleSelectDoctor(doctor)}
                    >
                      <div className="doctor-image-wrapper">
                        <div className="doctor-avatar">
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#D96A7A"/>
                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#D96A7A"/>
                          </svg>
                        </div>
                      </div>
                      <div className="doctor-info">
                        <h3 className="doctor-name">{doctor.name}</h3>
                        <p className="doctor-department">{doctor.department}</p>
                      </div>
                      <div className="doctor-actions">
                        <button 
                          className={`btn-select-doctor-find ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSelectDoctor(doctor);
                          }}
                          type="button"
                        >
                          {selectedDoctor?.id === doctor.id ? '✓ เลือกแล้ว' : 'เลือกแพทย์'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>ไม่พบผลการค้นหา</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalDoctorPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handleDoctorPageChange(doctorCurrentPage - 1)}
                    disabled={doctorCurrentPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back
                  </button>
                  <button
                    className="pagination-btn"
                    onClick={() => handleDoctorPageChange(doctorCurrentPage + 1)}
                    disabled={doctorCurrentPage === totalDoctorPages}
                  >
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="modal-actions">
                <button className="btn-close-modal" onClick={handleCloseDoctorModal}>
                  ยกเลิก
                </button>
                <button 
                  className="btn-confirm" 
                  onClick={handleConfirmDoctorSelection}
                  disabled={!selectedDoctor}
                >
                  ยืนยันการเลือก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Symptom Modal */}
      {showSymptomModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>กรุณาบอกรายละเอียดอาการ</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              {/* Step 1: เลือกส่วนของร่างกาย */}
              {modalStep === 1 && (
                <>
                  <div className="form-group">
                    <label>เป็นอะไรตรงส่วนไหน?</label>
                    <div className="body-parts-grid">
                      {bodyParts.map((part) => (
                        <button
                          key={part.id}
                          className={`body-part-btn ${selectedBodyPart === part.id ? 'selected' : ''}`}
                          onClick={() => handleBodyPartClick(part.id)}
                        >
                          <span className="body-part-icon">
                            <img src={part.image} alt={part.name} />
                          </span>
                          <span className="body-part-name">{part.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: เลือกอาการ */}
              {modalStep === 2 && (
                <>
                  <div className="modal-step-header">
                    <button className="btn-back" onClick={handleBackToBodyPart}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      กลับ
                    </button>
                    <p className="selected-info">
                      ส่วนที่เลือก: <strong>{bodyParts.find(bp => bp.id === selectedBodyPart)?.name}</strong>
                    </p>
                  </div>
                  <div className="form-group">
                    <label>รู้สึกยังไง?</label>
                    <div className="symptoms-grid">
                      {getSymptomsByBodyPart(selectedBodyPart).map((symptom) => (
                        <button
                          key={symptom.id}
                          className={`symptom-btn ${selectedSymptom === symptom.id ? 'selected' : ''}`}
                          onClick={() => handleSymptomClick(symptom.id)}
                        >
                          <span className="symptom-name">{symptom.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: แสดงแพทย์แนะนำ */}
              {modalStep === 3 && recommendedInfo && (
                <div className="recommendation-result">
                  <div className="modal-step-header">
                    <button className="btn-back" onClick={handleBackToSymptom}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      กลับ
                    </button>
                    <p className="selected-info">
                      {bodyParts.find(bp => bp.id === selectedBodyPart)?.name} - {getSymptomsByBodyPart(selectedBodyPart).find(s => s.id === selectedSymptom)?.name}
                    </p>
                  </div>
                  
                  <div className="recommendation-info">
                    <h3>ผลการวิเคราะห์</h3>
                    <p className="recommendation-description">{recommendedInfo.description}</p>
                    <p className="recommendation-advice">{recommendedInfo.advice}</p>
                    <p className="recommendation-department">
                      แนะนำให้พบ <strong>{recommendedInfo.doctorType}</strong> ที่ <strong>{recommendedInfo.department}</strong>
                    </p>
                  </div>
                  
                  {recommendedDoctors.length > 0 && (
                    <div className="recommended-doctors">
                      <h3>แพทย์ที่แนะนำ</h3>
                      <div className="doctors-list">
                        {recommendedDoctors.map((doctor) => (
                          <div key={doctor.id} className="doctor-card-modal">
                            <h4>{doctor.name}</h4>
                            <p className="doctor-specialization">{doctor.specialization}</p>
                            <p className="doctor-experience">ประสบการณ์: {doctor.experience}</p>
                            <div className="doctor-expertise">
                              <strong>ความชำนาญ:</strong> {doctor.expertise.slice(0, 3).join(', ')}
                            </div>
                            <button 
                              className={`btn-select-doctor-modal ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelectDoctor(doctor);
                              }}
                              type="button"
                            >
                              {selectedDoctor?.id === doctor.id ? '✓ เลือกแล้ว' : 'เลือกแพทย์คนนี้'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="modal-actions">
                    <button className="btn-close-modal" onClick={handleCloseModal}>
                      ปิด
                    </button>
                    <button 
                      className="btn-confirm" 
                      onClick={handleCloseModal}
                      disabled={!selectedDoctor}
                    >
                      ยืนยันการเลือก
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
