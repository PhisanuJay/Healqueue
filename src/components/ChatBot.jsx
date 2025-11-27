import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { generateResponse } from '../data/medicalData';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'สวัสดีค่ะ! ฉันเป็นแชทบอทของโรงพยาบาล ยินดีให้คำปรึกษาและแนะนำแพทย์ค่ะ คุณมีคำถามอะไรไหมคะ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // เพิ่มข้อความของผู้ใช้
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // จำลองการตอบกลับของบอท
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        showDoctor: response.showDoctor,
        department: response.department,
        doctorType: response.doctorType,
        doctors: response.doctors || []
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chatbot-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open Chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="white"/>
          <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12Z" fill="white"/>
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H11V21H5V3H13V9H21ZM14 10V12H22V10H14ZM14 14V16H22V14H14ZM14 18V20H19V18H14Z" fill="white"/>
                </svg>
              </div>
              <div>
                <h3 className="chatbot-title">แชทบอทโรงพยาบาล</h3>
                <p className="chatbot-subtitle">พร้อมให้คำปรึกษา 24/7</p>
              </div>
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.showDoctor && message.department && (
                    <div className="doctor-suggestion">
                      <p className="suggestion-label">แนะนำ:</p>
                      <p className="suggestion-text">
                        {message.doctorType && `${message.doctorType} - `}
                        {message.department}
                      </p>
                      {message.doctors && message.doctors.length > 0 && (
                        <div className="doctors-list">
                          {message.doctors.slice(0, 2).map((doctor, index) => (
                            <div key={doctor.id} className="doctor-card">
                              <p className="doctor-name">{doctor.name}</p>
                              <p className="doctor-specialization">{doctor.specialization}</p>
                              <p className="doctor-experience">ประสบการณ์: {doctor.experience}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString('th-TH', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-questions">
            <p className="quick-questions-label">คำถามที่พบบ่อย:</p>
            <div className="quick-questions-buttons">
              <button 
                className="quick-question-btn"
                onClick={() => handleQuickQuestion('ปวดหัว')}
              >
                ปวดหัว
              </button>
              <button 
                className="quick-question-btn"
                onClick={() => handleQuickQuestion('ปวดท้อง')}
              >
                ปวดท้อง
              </button>
              <button 
                className="quick-question-btn"
                onClick={() => handleQuickQuestion('เปิดกี่โมง')}
              >
                เปิดกี่โมง
              </button>
            </div>
          </div>

          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="พิมพ์ข้อความของคุณ..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="chatbot-send" aria-label="Send Message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="white"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;

