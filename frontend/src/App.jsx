import { BrowserRouter, Route, Routes } from 'react-router'
import CreatePage from './pages/CreatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePage/>} />
        </Routes>
      </div>
    </> 
  )
}

export default App
