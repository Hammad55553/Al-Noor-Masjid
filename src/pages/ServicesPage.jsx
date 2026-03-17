import Services from '../components/Services/Services';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function ServicesPage() {
    const { t } = useTranslation();

    return (
        <main className="pt-28 pb-20 min-h-screen">
            <div className="px-4 max-w-7xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('community_services')}</h1>
                    <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-12"></div>
                </motion.div>
            </div>
            <Services />
        </main>
    );
}
