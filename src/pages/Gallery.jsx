import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Gallery() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const images = [
        "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590076247565-d603bd872b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1565552355444-24e54817a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519817914152-2a040b2472fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ];

    return (
        <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('gallery')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-emerald-100">{t('view_gallery')}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/60 group relative aspect-[4/3] cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300"></div>
                        <img
                            src={src}
                            alt="Mosque Gallery"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
