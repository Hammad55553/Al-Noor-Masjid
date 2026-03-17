import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PlayCircle, Video, Music } from 'lucide-react';

export default function Multimedia() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const mediaItems = [
        {
            type: "Video",
            title: "Khutbah: Importance of Patience",
            icon: <Video size={32} />,
            thumbnail: "https://images.unsplash.com/photo-1519817914152-2a040b2472fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            type: "Audio",
            title: "Quran Recitation - Surah Rahman",
            icon: <Music size={32} />,
            thumbnail: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            type: "Video",
            title: "Special Ramadan Lecture Series",
            icon: <Video size={32} />,
            thumbnail: "https://images.unsplash.com/photo-1565552355444-24e54817a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('multimedia')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel group cursor-pointer overflow-hidden p-0 border border-emerald-800"
                    >
                        <div className="relative h-64">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle className="text-gold-500 w-20 h-20 drop-shadow-2xl" />
                            </div>
                            <div className="absolute top-4 left-4 bg-gold-500 text-emerald-950 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                {item.type}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors">{item.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
