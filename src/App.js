import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/Shared/ScrollToTop';
import ScrollToTopOnNavigate from './components/Shared/ScrollToTopOnNavigate';
import Home from './pages/Home';
import Services from './pages/Services';
import Works from './pages/Works';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import CreativePursuits from './pages/CreativePursuits';
import './styles/main.css';

function App() {
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/works" element={<Works />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creative-pursuits" element={<CreativePursuits />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default App;
