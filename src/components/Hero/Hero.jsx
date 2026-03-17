import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Real Background Image instead of simple pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-emerald-950/70 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Beautiful Grand Mosque"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h2 variants={fadeInUp} className="text-gold-500 text-xl md:text-3xl mb-4 font-medium tracking-wider drop-shadow-md">
                        {t('welcome')}
                    </motion.h2>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bold mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] leading-tight lg:leading-tight">
                        {t('mosque_name')}
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl md:text-3xl text-emerald-50 max-w-3xl mx-auto mb-10 opacity-95 drop-shadow-md font-medium">
                        {t('slogan')}
                    </motion.p>
                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
                        <Link to="/contact" className="bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 hover:-translate-y-1 shadow-[0_10px_30px_rgba(212,175,55,0.4)] text-lg">
                            {t('contact')}
                        </Link>
                        <Link to="/about" className="bg-emerald-900/40 backdrop-blur-md border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-emerald-950 font-bold py-4 px-10 rounded-full transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-lg">
                            {t('read_more')}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
