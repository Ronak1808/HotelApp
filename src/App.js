import { useState } from 'react'
import Navbar from './components/Home/Navbar/Navbar'
import Userpage from './components/Userpage/Userpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
function App() {
    const [count, setCount] = useState({ value: 0 });

    return (
        <>
        <ToastContainer />
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userpage" element={<Userpage />} />
            </Routes>
        </Router>
        </>
    )
}

export default App
