import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Committee from './pages/Committee';
import Donation from './pages/Donation';
import Events from './pages/Events';
import Multimedia from './pages/Multimedia';
import Quran from './pages/Quran';
import Hadith from './pages/Hadith';

export default function App() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    setCurrentLang(i18n.language);
  }, [i18n, i18n.language]);

  const fontClass =
    currentLang === 'ar' ? 'font-arabic' :
      currentLang === 'ur' ? 'font-urdu' : 'font-sans';

  return (
    <Router>
      <div className={`min-h-screen bg-emerald-950 text-white selection:bg-gold-500 selection:text-emerald-950 flex flex-col ${fontClass}`}>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/events" element={<Events />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/hadith" element={<Hadith />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
