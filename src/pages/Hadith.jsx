import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ArrowLeft, Book, ChevronRight, Share2, Clipboard } from 'lucide-react';
import { fetchHadithBooks, fetchHadiths } from '../api/hadithService';

export default function Hadith() {
    const { t, i18n } = useTranslation();
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [hadiths, setHadiths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleLangs, setVisibleLangs] = useState({ ara: true, urd: true, eng: true });

    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchHadithBooks();
            setBooks(data);
            setLoading(false);
        };
        loadBooks();
    }, []);

    const handleBookClick = async (book) => {
        setLoading(true);
        setSelectedBook(book);
        setPage(1);
        const data = await fetchHadiths(book.bookSlug, book.source, 1);
        setHadiths(data.data);
        setHasMore(data.data.length > 0);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLoadMore = async () => {
        if (!selectedBook || loadingMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        const data = await fetchHadiths(selectedBook.bookSlug, selectedBook.source, nextPage);
        if (data.data.length > 0) {
            setHadiths(prev => [...prev, ...data.data]);
            setPage(nextPage);
        } else {
            setHasMore(false);
        }
        setLoadingMore(false);
    };

    const copyToClipboard = (hadith) => {
        const text = `${hadith.hadithArabic}\n\n${hadith.hadithUrdu}\n\n${hadith.hadithEnglish}`;
        navigator.clipboard.writeText(text).then(() => {
            alert("Hadith copied to clipboard!");
        });
    };

    const shareHadith = (hadith) => {
        if (navigator.share) {
            navigator.share({
                title: selectedBook.bookName,
                text: `${hadith.hadithArabic}\n\n${hadith.hadithUrdu}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            copyToClipboard(hadith);
        }
    };

    const filteredBooks = (books || []).filter(b =>
        b?.bookName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="flex justify-center mb-6">
                    <BookOpen className="text-gold-500 w-20 h-20" />
                </div>
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">{t('hadith_collection')}</h1>
                <div className="w-32 h-2 bg-gold-500 mx-auto rounded-full"></div>
            </motion.div>

            <AnimatePresence mode="wait">
                {selectedBook ? (
                    <motion.div
                        key="hadiths"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-10"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <button
                                onClick={() => setSelectedBook(null)}
                                className="flex items-center gap-2 text-gold-500 hover:text-gold-400 font-bold transition-all group"
                            >
                                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                {t('back_to_books')}
                            </button>

                            <div className="flex gap-2 bg-emerald-900/30 p-2 rounded-2xl border border-emerald-800/50">
                                {['ara', 'urd', 'eng'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setVisibleLangs(prev => ({ ...prev, [lang]: !prev[lang] }))}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${visibleLangs[lang] ? 'bg-gold-500 text-emerald-950' : 'text-emerald-100/40 hover:text-emerald-100'}`}
                                    >
                                        {lang === 'ara' ? 'Arabic' : lang === 'urd' ? 'Urdu' : 'English'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-gold-500/20 text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{selectedBook.bookName}</h2>
                            <p className="text-gold-500 text-2xl font-urdu">{selectedBook.writerEnglishName}</p>
                            <div className="mt-6 inline-block bg-emerald-900/50 px-6 py-2 rounded-full border border-gold-500/30 text-emerald-100">
                                {selectedBook.hadiths_count} Hadiths
                            </div>
                        </div>

                        <div className="space-y-12">
                            {hadiths.map((hadith, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-panel p-8 md:p-12 border-emerald-800/40 relative group"
                                >
                                    <div className="flex justify-between items-center mb-10 border-b border-emerald-800/30 pb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gold-500 text-emerald-950 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-gold-500/20">
                                                {hadith.hadithNumber}
                                            </div>
                                            <span className="text-gold-500/60 font-bold uppercase tracking-[0.2em] text-sm">{hadith.chapter.chapterEnglish}</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => shareHadith(hadith)}
                                                className="p-3 bg-emerald-900/40 rounded-xl text-gold-500 border border-emerald-800 hover:bg-gold-500 hover:text-emerald-950 transition-all"
                                            >
                                                <Share2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(hadith)}
                                                className="p-3 bg-emerald-900/40 rounded-xl text-gold-500 border border-emerald-800 hover:bg-gold-500 hover:text-emerald-950 transition-all"
                                            >
                                                <Clipboard size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        {visibleLangs.ara && (
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-bold text-gold-500/40 tracking-[0.2em] uppercase">Arabic</span>
                                                <p className="text-4xl md:text-5xl font-arabic text-white leading-[2.5] text-right" dir="rtl">
                                                    {hadith.hadithArabic}
                                                </p>
                                            </div>
                                        )}

                                        {(visibleLangs.urd || visibleLangs.eng) && (
                                            <div className="bg-emerald-900/20 p-8 rounded-3xl border border-emerald-800/30 space-y-8">
                                                {visibleLangs.urd && (
                                                    <div className="space-y-4">
                                                        <span className="text-[10px] font-bold text-gold-500/40 tracking-[0.2em] uppercase block text-right">Urdu / اردو</span>
                                                        <p className="text-2xl md:text-3xl font-urdu text-white leading-relaxed text-right" dir="rtl">
                                                            {hadith.hadithUrdu}
                                                        </p>
                                                    </div>
                                                )}
                                                {visibleLangs.urd && visibleLangs.eng && (
                                                    <div className="border-t border-emerald-800/20"></div>
                                                )}
                                                {visibleLangs.eng && (
                                                    <div className="space-y-4">
                                                        <span className="text-[10px] font-bold text-gold-500/40 tracking-[0.2em] uppercase block">English</span>
                                                        <p className="text-xl md:text-2xl text-emerald-100/70 leading-relaxed italic">
                                                            {hadith.hadithEnglish}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="mt-20 flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold py-5 px-12 rounded-2xl transition-all shadow-xl shadow-gold-500/20 active:scale-95 disabled:opacity-50"
                                >
                                    {loadingMore ? 'LOADING...' : 'LOAD MORE HADITH'}
                                </button>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                        <div className="relative max-w-2xl mx-auto mb-20">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-100/40" size={28} />
                            <input
                                type="text"
                                placeholder={t('search_hadith')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-emerald-900/30 border-2 border-emerald-800 rounded-2xl py-6 pl-20 pr-8 text-2xl text-white focus:outline-none focus:border-gold-500 transition-all font-sans"
                            />
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-40 gap-8">
                                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gold-500"></div>
                                <p className="text-gold-500 font-bold tracking-[0.3em] text-xl animate-pulse">REVEALING TRUTH...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredBooks.map((book) => (
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -10 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={book.id}
                                        onClick={() => handleBookClick(book)}
                                        className="glass-panel p-10 flex flex-col items-center text-center group hover:border-gold-500/50 transition-all relative overflow-hidden"
                                    >
                                        <div className="w-24 h-24 bg-emerald-900/50 rounded-3xl flex items-center justify-center mb-8 border border-emerald-800 group-hover:bg-gold-500 group-hover:text-emerald-950 transition-all duration-500">
                                            <Book size={48} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">{book.bookName}</h3>
                                        <div className="flex gap-2 mb-4">
                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${book.maslak === 'Shia' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-gold-500/10 text-gold-500 border-gold-500/30'}`}>
                                                {book.maslak}
                                            </span>
                                        </div>
                                        <p className="text-gold-500/80 mb-6 font-urdu text-xl">{book.writerEnglishName}</p>
                                        <div className="w-full border-t border-emerald-800/50 pt-6 flex justify-between items-center text-emerald-100/40 font-bold text-sm">
                                            <span>{book.hadiths_count} HADITHS</span>
                                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
