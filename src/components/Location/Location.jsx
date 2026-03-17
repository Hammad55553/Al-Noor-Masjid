import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Location() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 bg-emerald-950 relative border-t border-emerald-900/50">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="lg:w-1/3 text-center lg:text-start"
                >
                    <MapPin className="w-16 h-16 text-gold-500 mb-8 mx-auto lg:mx-0 drop-shadow-lg" />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">{t('contact')}</h2>
                    <p className="text-xl md:text-2xl text-emerald-100/90 mb-10 flex items-center justify-center lg:justify-start gap-4 leading-relaxed p-4 bg-emerald-900/40 rounded-xl border border-emerald-800/50">
                        <MapPin className="text-gold-500 shrink-0" size={32} />
                        <span dir="auto">{t('address')}</span>
                    </p>
                    <a
                        href="https://www.google.com/maps/place/Al-Noor+Jamia+Masjid/@29.6910788,72.5533293,17z"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 bg-gold-500 text-emerald-950 font-bold py-4 px-10 rounded-full transition-all hover:scale-105 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-lg"
                    >
                        <MapPin size={24} />
                        {t('view_on_map')}
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-2/3 w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(2,44,34,0.5)] border-4 border-emerald-800/60 relative group"
                >
                    <div className="absolute inset-0 bg-emerald-950/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.708827725593!2d72.5533293!3d29.6910788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c57d48d0bc879%3A0xa9771cc1783914a!2sAl-Noor%20Jamia%20Masjid!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Masjid Location Map"
                        className="grayscale contrast-125 sepia-[.2] hue-rotate-[140deg] invert-[0.1] group-hover:filter-none transition-all duration-1000"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
