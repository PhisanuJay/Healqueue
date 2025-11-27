import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctor.css';
import { medicalDatabase } from '../../data/medicalData';

const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 9;
  const navigate = useNavigate();

  // รวมหมอทุกแผนก
  const allDoctors = useMemo(() => {
    const doctors = [];
    for (const [department, doctorList] of Object.entries(medicalDatabase.doctors)) {
      doctorList.forEach(doctor => {
        doctors.push({
          ...doctor,
          department: department
        });
      });
    }
    return doctors;
  }, []);

  // ค้นหาหมอ
  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) {
      return allDoctors;
    }
    const query = searchQuery.toLowerCase();
    return allDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query) ||
      doctor.department.toLowerCase().includes(query) ||
      doctor.expertise.some(exp => exp.toLowerCase().includes(query))
    );
  }, [searchQuery, allDoctors]);

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAppointment = (doctor) => {
    navigate('/appointment', { state: { doctor } });
  };

  const handleDetails = (doctor) => {
    // สามารถเปิด modal หรือ navigate ไปหน้าอื่นได้
    alert(`รายละเอียดแพทย์\n\n${doctor.name}\n${doctor.specialization}\nประสบการณ์: ${doctor.experience}\nการศึกษา: ${doctor.education}`);
  };

  return (
    <div className="find-doctor-page">
      <div className="find-doctor-container">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="ค้นหาชื่อบุคลากรณ์ทางการแพทย์"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
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
                    className="btn-appointment"
                    onClick={() => handleAppointment(doctor)}
                  >
                    นัดหมายแพทย์
                  </button>
                  <button 
                    className="btn-details"
                    onClick={() => handleDetails(doctor)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    รายละเอียด
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
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
