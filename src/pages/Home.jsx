import Hero from '../components/Hero/Hero';
import PrayerTimes from '../components/PrayerTimes/PrayerTimes';
import Services from '../components/Services/Services';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';

export default function Home() {
    const { t } = useTranslation();

    return (
        <main>
            <Hero />

            {/* Hadith Section */}
            <section className="py-20 bg-emerald-950 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel p-10 md:p-16 border-2 border-gold-500/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
                    >
                        <Quote className="text-gold-500 w-12 h-12 mx-auto mb-6 opacity-50" />
                        <h2 className="text-gold-500 text-xl font-bold uppercase tracking-widest mb-4">{t('hadith_title')}</h2>
                        <p className="text-2xl md:text-4xl text-white font-medium leading-relaxed italic mb-8">
                            {t('hadith_text')}
                        </p>
                        <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
                    </motion.div>
                </div>
            </section>

            <PrayerTimes />

            {/* Spiritual Invitation Section */}
            <section className="py-24 bg-gradient-to-b from-emerald-950 to-emerald-900 overflow-hidden text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <Heart className="w-16 h-16 text-gold-500 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">{t('mosque_name')}</h2>
                    <p className="text-xl text-emerald-100/80 mb-10 leading-relaxed font-sans">
                        {t('about_desc')}
                    </p>
                    <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
                </motion.div>
            </section>

            <Services />
        </main>
    );
}
