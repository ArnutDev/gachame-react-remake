import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRangersPage from './pages/RandomRangersPage'
import RandomGearsPage from './pages/RandomGearsPage'

import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UpdatesPage from "./pages/UpdatesPage";
function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random-rangers" element={<RandomRangersPage />} />
        <Route path="/random-gears" element={<RandomGearsPage />} />
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/updates" element={<UpdatesPage />} />
      </Routes>
    </Router>
  )
}

export default App
