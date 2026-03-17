import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';

export default function Services() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
    };

    const services = [
        {
            title: t('quran_classes'),
            desc: t('quran_desc'),
            icon: <BookOpen className="text-gold-500" size={40} />
        },
        {
            title: t('islamic_library'),
            desc: t('library_desc'),
            icon: <BookOpen className="text-gold-500" size={40} />
        },
        {
            title: t('charity'),
            desc: t('charity_desc'),
            icon: <Heart className="text-gold-500" size={40} />
        }
    ];

    return (
        <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <BookOpen className="w-16 h-16 text-gold-500 mx-auto mb-6 drop-shadow-md" />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md tracking-tight">{t('community_services')}</h2>
                    <div className="w-32 h-1.5 bg-gold-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-12 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.2 }}
                            variants={fadeInUp}
                            className="glass-panel p-8 md:p-10 text-center flex flex-col items-center hover:bg-emerald-800/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-emerald-500/20 group"
                        >
                            <div className="w-24 h-24 bg-emerald-900 shadow-inner rounded-full flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300 border border-emerald-700/50">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-gold-400 transition-colors">{service.title}</h3>
                            <p className="text-emerald-100/80 mb-8 font-sans text-lg md:text-xl flex-grow">
                                {service.desc}
                            </p>
                            <button className="text-gold-500 font-bold hover:text-white uppercase tracking-wider text-sm transition-colors relative overflow-hidden group/btn px-4 py-2">
                                <span className="relative z-10">{t('read_more')}</span>
                                <div className="absolute inset-0 h-0.5 bg-gold-500 bottom-0 left-0 group-hover/btn:h-full group-hover/btn:opacity-10 transition-all duration-300"></div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
