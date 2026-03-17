import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function About() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('about_us')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/60"
                >
                    <img
                        src="https://images.unsplash.com/photo-1590076247565-d603bd872b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                        alt="Beautiful Mosque Interior"
                        className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="glass-panel p-8 md:p-12"
                >
                    <h2 className="text-3xl font-bold text-gold-500 mb-6">{t('our_mission')}</h2>
                    <p className="text-xl text-emerald-100/90 leading-relaxed mb-6">
                        {t('about_desc')}
                    </p>
                    <p className="text-xl text-emerald-100/90 leading-relaxed">
                        {t('mission_desc')}
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
