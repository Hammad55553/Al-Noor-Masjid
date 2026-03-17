import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Menu, X, ChevronDown, Book, Users, Image as ImageIcon, Calendar, PlaySquare, BookOpen, Scroll } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const currentLang = i18n.language || 'en';
    const isRtl = i18n.dir() === 'rtl';

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const mainLinks = [
        { to: "/", label: t('home') },
        { to: "/about", label: t('about_us') },
        { to: "/quran", label: t('quran_majeed') },
        { to: "/hadith", label: t('hadith_collection') },
        { to: "/contact", label: t('contact') },
        { to: "/donation", label: t('donation') },
    ];

    const dropdownLinks = [
        { to: "/services", label: t('community_services'), icon: <Heart size={18} /> },
        { to: "/committee", label: t('committee'), icon: <Users size={18} /> },
        { to: "/gallery", label: t('gallery'), icon: <ImageIcon size={18} /> },
        { to: "/events", label: t('events'), icon: <Calendar size={18} /> },
        { to: "/multimedia", label: t('multimedia'), icon: <PlaySquare size={18} /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed w-full z-50 glass-panel border-b-0 rounded-none bg-emerald-950/90 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-2 md:px-4">
                <div className="flex justify-between items-center h-20">
                    <Link to="/">
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20">
                                <Heart size={20} className="text-emerald-950" />
                            </div>
                            <span className="text-lg md:text-xl xl:text-2xl font-bold text-gold-500 tracking-tight font-sans whitespace-nowrap">
                                {t('mosque_name')}
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 rtl:space-x-reverse">
                        {mainLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.to}
                                className={`transition-colors font-medium tracking-wide ${isActive(link.to) ? 'text-gold-500 font-bold border-b-2 border-gold-500 pb-1' : 'hover:text-gold-500'}`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Dropdown for Services & Explore */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                className="flex items-center gap-1 transition-colors font-medium hover:text-gold-500 tracking-wide"
                            >
                                {t('explore')} <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        onMouseLeave={() => setIsDropdownOpen(false)}
                                        className="absolute top-full mt-2 w-56 bg-emerald-900 border-2 border-emerald-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-3 z-50 backdrop-blur-xl"
                                        style={{ [isRtl ? 'right' : 'left']: 0 }}
                                    >
                                        {dropdownLinks.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                to={link.to}
                                                className={`flex items-center gap-3 px-5 py-3 hover:bg-emerald-800 transition-colors ${isActive(link.to) ? 'text-gold-500 font-bold bg-emerald-800/50' : 'text-white'}`}
                                            >
                                                <span className="text-gold-500/70">{link.icon}</span>
                                                <span className="text-sm font-medium">{link.label}</span>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-1.5 bg-emerald-900/50 px-3 py-1.5 rounded-full border border-emerald-800 ml-4">
                            <Globe size={16} className="text-gold-500" />
                            <div className="flex items-center gap-1">
                                <button onClick={() => changeLanguage('en')} className={`text-[11px] font-bold tracking-tighter transition-colors ${currentLang === 'en' ? 'text-gold-500' : 'text-gray-400 hover:text-white'}`}>EN</button>
                                <span className="text-gray-700 text-[10px]">/</span>
                                <button onClick={() => changeLanguage('ur')} className={`text-[11px] font-bold tracking-tighter transition-colors ${currentLang === 'ur' ? 'text-gold-500 font-urdu' : 'text-gray-400 hover:text-white'}`}>اردو</button>
                                <span className="text-gray-700 text-[10px]">/</span>
                                <button onClick={() => changeLanguage('ar')} className={`text-[11px] font-bold tracking-tighter transition-colors ${currentLang === 'ar' ? 'text-gold-500 font-arabic' : 'text-gray-400 hover:text-white'}`}>AR</button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gold-500 p-2 hover:bg-emerald-900 rounded-lg transition-colors">
                            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-emerald-950/98 backdrop-blur-2xl border-b-2 border-emerald-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-8 space-y-1 max-h-[85vh] overflow-y-auto">
                            {mainLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-4 rounded-xl text-lg font-medium transition-all ${isActive(link.to) ? 'bg-emerald-900 border-l-4 border-gold-500 text-gold-500 shadow-lg' : 'text-white hover:bg-emerald-900/50'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="pt-4 mt-4 border-t border-emerald-800/50">
                                <p className="px-4 py-2 text-xs text-gold-500/60 font-bold uppercase tracking-widest mb-2">{t('explore')}</p>
                                {dropdownLinks.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        to={link.to}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg transition-all ${isActive(link.to) ? 'bg-emerald-900 border-l-4 border-gold-500 text-gold-500 shadow-lg' : 'text-white hover:bg-emerald-900/50'}`}
                                    >
                                        <span className="text-gold-500">{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex justify-around items-center px-4 py-6 border-t border-emerald-800/50 mt-6 pt-8 bg-emerald-900/20 rounded-2xl">
                                <button onClick={() => changeLanguage('en')} className={`flex flex-col items-center gap-1 ${currentLang === 'en' ? 'text-gold-500 font-bold' : 'text-gray-400'}`}>
                                    <span className="text-sm">English</span>
                                </button>
                                <button onClick={() => changeLanguage('ur')} className={`flex flex-col items-center gap-1 ${currentLang === 'ur' ? 'text-gold-500 font-bold font-urdu' : 'text-gray-400'}`}>
                                    <span className="text-lg">اردو</span>
                                </button>
                                <button onClick={() => changeLanguage('ar')} className={`flex flex-col items-center gap-1 ${currentLang === 'ar' ? 'text-gold-500 font-bold font-arabic' : 'text-gray-400'}`}>
                                    <span className="text-lg">العربية</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
