import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Location from '../components/Location/Location';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <main className="pt-28 pb-20 min-h-screen">
            <div className="px-4 max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('contact')}</h1>
                    <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-12"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 bg-emerald-900/30 p-8 rounded-3xl border border-emerald-800/50">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-gold-500 mb-6">{t('send_message')}</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-emerald-100 mb-2">{t('name')}</label>
                                <input type="text" className="w-full bg-emerald-950/50 border border-emerald-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-emerald-100 mb-2">{t('email')}</label>
                                <input type="email" className="w-full bg-emerald-950/50 border border-emerald-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-emerald-100 mb-2">{t('message')}</label>
                                <textarea rows="4" className="w-full bg-emerald-950/50 border border-emerald-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"></textarea>
                            </div>
                            <button type="button" className="bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
                                {t('send_message')}
                            </button>
                        </form>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Contact"
                            className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                        />
                    </motion.div>
                </div>
            </div>

            <Location />
        </main>
    );
}
