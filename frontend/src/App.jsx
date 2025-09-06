import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import your pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import EmergencyContacts from './pages/Emergency'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <h1>Tourist Safety app</h1>
     
      {/* Navigation
     <nav style={{
  background: "#282c34",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>
  <div style={{ color: "white", fontWeight: "bold" }}>Tourist Safety App</div>

  <div style={{ position: "relative" }}>
    <button style={{
      background: "#61dafb",
      border: "none",
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer"
    }}>
      Menu ▼
    </button>

    <div style={{
      position: "absolute",
      top: "40px",
      right: 0,
      background: "white",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      minWidth: "120px"
    }}>
      <Link to="/" style={{ padding: "10px", textDecoration: "none", color: "black" }}>Home</Link>
      <Link to="/register" style={{ padding: "10px", textDecoration: "none", color: "black" }}>Register</Link>
    </div>
  </div>
</nav> */}


      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emergency" element={<EmergencyContacts />} />


      </Routes>
    </>
  )
}

export default App
