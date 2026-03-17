import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const { t } = useTranslation();

    const quickLinks = [
        { to: "/", label: t('home') },
        { to: "/about", label: t('about_us') },
        { to: "/quran", label: t('quran_majeed') },
        { to: "/donation", label: t('donation') },
    ];

    const usefulLinks = [
        { to: "/services", label: t('community_services') },
        { to: "/committee", label: t('committee') },
        { to: "/gallery", label: t('gallery') },
        { to: "/events", label: t('events') },
    ];

    return (
        <footer className="bg-emerald-950 border-t border-emerald-900 pt-20 relative overflow-hidden">
            {/* Islamic Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Brand & Desc */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gold-500 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/20">
                                <Heart className="text-emerald-950" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-wide">{t('mosque_name')}</span>
                        </div>
                        <p className="text-emerald-100/60 leading-relaxed text-lg italic">
                            {t('slogan')}
                        </p>
                        <div className="w-16 h-1 bg-gold-500/50 rounded-full"></div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-gold-500 font-bold text-xl mb-8 uppercase tracking-widest">{t('quick_links')}</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="text-emerald-100/70 hover:text-gold-500 transition-colors flex items-center gap-2 group">
                                        <ChevronRight size={16} className="text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Useful Links */}
                    <div>
                        <h3 className="text-gold-500 font-bold text-xl mb-8 uppercase tracking-widest">{t('useful_links')}</h3>
                        <ul className="space-y-4">
                            {usefulLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="text-emerald-100/70 hover:text-gold-500 transition-colors flex items-center gap-2 group">
                                        <ChevronRight size={16} className="text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className="text-gold-500 font-bold text-xl mb-8 uppercase tracking-widest">{t('contact_info')}</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 text-emerald-100/70">
                                <MapPin className="text-gold-500 shrink-0 mt-1" size={20} />
                                <span className="text-lg">{t('address')}</span>
                            </li>
                            <li className="flex items-center gap-4 text-emerald-100/70">
                                <Phone className="text-gold-500 shrink-0" size={20} />
                                <span className="text-lg">0300-1234567</span>
                            </li>
                            <li className="flex items-center gap-4 text-emerald-100/70">
                                <Mail className="text-gold-500 shrink-0" size={20} />
                                <span className="text-lg">info@alnoormasjid.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-emerald-900/50 bg-emerald-950/50 py-8 px-4 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-emerald-100/40 text-sm font-sans tracking-wide">
                        &copy; {new Date().getFullYear()} {t('rights_reserved')}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-[1px] bg-emerald-800"></div>
                        <p className="text-gold-500/80 text-xs font-sans tracking-widest uppercase">
                            {t('designed_by')}
                        </p>
                        <div className="w-8 h-[1px] bg-emerald-800"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
