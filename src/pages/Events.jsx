import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const upcomingEvents = [
        {
            title: "Ramadan Prep Workshop",
            date: "March 25, 2026",
            time: "05:00 PM",
            location: "Main Hall",
            image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Weekly Quran Circle",
            date: "Every Friday",
            time: "Asr Prayer",
            location: "Library Section",
            image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Community Iftar",
            date: "April 01, 2026",
            time: "Maghrib",
            location: "Masjid Courtyard",
            image: "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    return (
        <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('events')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="glass-panel overflow-hidden border border-emerald-800 hover:border-gold-500/50 transition-colors group"
                    >
                        <div className="h-48 overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gold-500 mb-4">{event.title}</h3>
                            <div className="space-y-3 text-emerald-100/80">
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-gold-500" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-gold-500" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className="text-gold-500" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            <button className="mt-6 w-full py-3 bg-emerald-900/50 hover:bg-gold-500 hover:text-emerald-950 border border-gold-500/30 font-bold rounded-xl transition-all">
                                Participate
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
