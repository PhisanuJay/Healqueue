import './App.css'
import Header from './components/Header'
import Home from './paegs/Home/Home'
import Footer from './components/Footer'

function App() {
  

  return (
    <div className="App">
      <Header /> {/* 2. วาง Header ไว้นอก Home */}
      
      {/* 3. สร้าง main wrapper เพื่อจัดการ "เนื้อหา" */}
      <main className="main-content">
        <Home />
        {/* ในอนาคตถ้ามี React Router หน้ารอื่นๆ ก็จะมาแทนที่ Home ตรงนี้ */}
      </main>

        <Footer />
    </div>
  )
}

export default App
