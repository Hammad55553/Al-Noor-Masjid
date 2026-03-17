import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function PrayerTimes() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const prayers = [
        { name: t('fajr'), time: '05:30 AM' },
        { name: t('dhuhr'), time: '01:15 PM' },
        { name: t('asr'), time: '04:45 PM' },
        { name: t('maghrib'), time: '06:30 PM' },
        { name: t('isha'), time: '08:00 PM' },
        { name: t('jummah'), time: '01:30 PM' },
    ];

    return (
        <section id="prayer-times" className="py-24 px-4 bg-emerald-900/20 relative">
            <div className="max-w-6xl mx-auto z-10 relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <Clock className="w-12 h-12 text-gold-500 mx-auto mb-4 drop-shadow-md" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{t('prayer_times')}</h2>
                    <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {prayers.map((prayer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-6 text-center hover:bg-emerald-800/60 transition-colors group cursor-pointer border border-emerald-500/20 hover:border-gold-500/40 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gold-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <h3 className="text-xl font-bold text-gray-300 group-hover:text-white mb-2 relative z-10 transition-colors">{prayer.name}</h3>
                            <p className="text-2xl font-bold text-gold-500 relative z-10">{prayer.time}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
