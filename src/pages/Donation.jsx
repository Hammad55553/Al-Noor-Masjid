import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Building, Phone } from 'lucide-react';

export default function Donation() {
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
                <Heart className="w-16 h-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('donation')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto tracking-wide leading-relaxed">
                    {t('donate_desc')}
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-panel p-10 border-4 border-emerald-800/60"
                >
                    <div className="flex items-center gap-4 mb-8 border-b border-emerald-800/50 pb-6">
                        <Building className="text-gold-500" size={40} />
                        <h2 className="text-3xl font-bold text-white">{t('bank_transfer')}</h2>
                    </div>

                    <div className="space-y-6 text-xl">
                        <div>
                            <span className="block text-emerald-100/60 text-sm uppercase tracking-widest mb-1">{t('bank_name')}</span>
                            <span className="font-bold text-gold-500 text-2xl tracking-wide">Meezan Bank Ltd</span>
                        </div>
                        <div>
                            <span className="block text-emerald-100/60 text-sm uppercase tracking-widest mb-1">{t('account_no')}</span>
                            <span className="font-mono text-white text-2xl tracking-wider">0101-01010101-01</span>
                        </div>
                        <div>
                            <span className="block text-emerald-100/60 text-sm uppercase tracking-widest mb-1">Title</span>
                            <span className="font-bold text-white text-2xl tracking-wide">Al-Noor Jamia Masjid</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="rounded-3xl overflow-hidden shadow-2xl relative"
                >
                    <div className="absolute inset-0 bg-emerald-950/70 z-10"></div>
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center border-4 border-gold-500/20 rounded-3xl m-4">
                        <Phone className="text-gold-500 w-16 h-16 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-4">JazzCash / EasyPaisa</h2>
                        <p className="text-white text-3xl font-mono tracking-widest bg-emerald-900/60 px-6 py-4 rounded-xl border border-gold-500/50">
                            0300-1234567
                        </p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Coins"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </main>
    );
}
