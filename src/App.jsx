import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './paegs/Home/Home'
import FindDoctor from './paegs/FindDoctor/FindDoctor'
import Appointment from './paegs/Appointment/Appointment'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-doctor" element={<FindDoctor />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </BrowserRouter>
  )
}

export default App
