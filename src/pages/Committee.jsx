import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Heart } from 'lucide-react';

export default function Committee() {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const imams = [
        {
            name: "Qari Muhammad Abdullah",
            role: t('imam'),
            image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Hafiz Ahmed Hassan",
            role: "Assistant Imam",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    const admin = [
        {
            name: "Haji Abdul Rehman",
            role: t('president'),
            image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Muhammad Usman",
            role: t('secretary'),
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Sajjad Hussain",
            role: "Treasurer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    const renderSection = (title, items, icon) => (
        <div className="mb-20">
            <div className="flex items-center gap-4 mb-10 border-b border-emerald-800 pb-4">
                <div className="p-3 bg-gold-500 rounded-2xl shadow-lg shadow-gold-500/20 text-emerald-950">
                    {icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {items.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/60 bg-emerald-900/30 group text-center pb-8 backdrop-blur-sm"
                    >
                        <div className="h-64 overflow-hidden mb-6 filter sepia-[.1] group-hover:filter-none transition-all duration-700">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-wide">{member.name}</h3>
                        <p className="text-xl text-gold-500 font-medium">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <Users className="w-16 h-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">{t('committee')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-6"></div>
            </motion.div>

            {renderSection(t('religious_leadership'), imams, <Heart size={32} />)}
            {renderSection(t('administration'), admin, <ShieldCheck size={32} />)}
        </main>
    );
}
