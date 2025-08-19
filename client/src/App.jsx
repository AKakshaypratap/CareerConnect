import './App.css'
import Navbar from "./components/common/Navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"

function App() {
  return (
    <> 
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </>

  )
}

export default App