import React, { useState } from 'react';
import './styles/global.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutNIST from './components/AboutNIST';
import WhyJoin from './components/WhyJoin';
import Events from './components/Events';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Alumni from './components/Alumni';
import JoinForm from './components/JoinForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  const handleAdminClick = () => {
    const pass = prompt('Enter admin password:');
    if (pass === 'nistastro2025') {
      setAdminOpen(true);
    } else if (pass !== null) {
      alert('Incorrect password.');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutNIST />
        <WhyJoin />
        <Events />
        <Team />
        <Gallery />
        <Alumni />
        <JoinForm />
        <Contact />
      </main>
      <Footer onAdminClick={handleAdminClick} />
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </>
  );
}
