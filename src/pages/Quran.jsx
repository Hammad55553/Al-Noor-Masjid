import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Search, ArrowLeft, Play, Pause, Volume2, Globe, Languages, PlayCircle, StopCircle } from 'lucide-react';
import { fetchSurahs, fetchSurahDetail, fetchQaris, getAyahAudioUrl } from '../api/quranService';

export default function Quran() {
    const { t, i18n } = useTranslation();
    const [surahs, setSurahs] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [qaris, setQaris] = useState([]);
    const [selectedQari, setSelectedQari] = useState('ar.alafasy');
    const [selectedTranslation, setSelectedTranslation] = useState('ur.jalandhry');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [playingAyah, setPlayingAyah] = useState(null);
    const [isFullPlay, setIsFullPlay] = useState(false);

    const audioRef = useRef(new Audio());
    const isFullPlayRef = useRef(false); // Use ref for reliable access in event listeners
    const selectedSurahRef = useRef(null);

    useEffect(() => {
        const loadInitialData = async () => {
            const [surahData, qariData] = await Promise.all([fetchSurahs(), fetchQaris()]);
            setSurahs(surahData);
            setQaris(qariData.slice(0, 20));
            setLoading(false);
        };
        loadInitialData();
    }, []);

    const handleSurahClick = async (surahNumber) => {
        setLoading(true);
        const editions = `quran-uthmani,${selectedTranslation}`;
        const data = await fetchSurahDetail(surahNumber, editions);
        if (data) {
            const normalizedData = Array.isArray(data) ? data : [data];
            setSelectedSurah(normalizedData);
            selectedSurahRef.current = normalizedData;
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (selectedSurah && selectedSurah[0]) {
            handleSurahClick(selectedSurah[0].number);
        }
    }, [selectedTranslation]);

    const playAudio = (ayahNumberFull) => {
        // Stop current if playing same
        if (playingAyah === ayahNumberFull && !isFullPlayRef.current) {
            audioRef.current.pause();
            setPlayingAyah(null);
            return;
        }

        const url = getAyahAudioUrl(selectedQari, ayahNumberFull);
        audioRef.current.src = url;
        audioRef.current.play().catch(e => console.error("Audio play error:", e));
        setPlayingAyah(ayahNumberFull);

        // Auto-scroll to playing ayah
        const element = document.getElementById(`ayah-${ayahNumberFull}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        audioRef.current.onended = () => {
            if (isFullPlayRef.current && selectedSurahRef.current) {
                const ayahs = selectedSurahRef.current[0].ayahs;
                const currentIndex = ayahs.findIndex(a => a.number === ayahNumberFull);

                if (currentIndex < ayahs.length - 1) {
                    const nextAyah = ayahs[currentIndex + 1];
                    playAudio(nextAyah.number);
                } else {
                    stopAllAudio();
                }
            } else {
                setPlayingAyah(null);
            }
        };
    };

    const stopAllAudio = () => {
        audioRef.current.pause();
        audioRef.current.src = "";
        setPlayingAyah(null);
        setIsFullPlay(false);
        isFullPlayRef.current = false;
    };

    const handleFullPlayToggle = () => {
        if (isFullPlay) {
            stopAllAudio();
        } else {
            setIsFullPlay(true);
            isFullPlayRef.current = true;
            if (selectedSurah && selectedSurah[0]) {
                playAudio(selectedSurah[0].ayahs[0].number);
            }
        }
    };

    const getRevelationType = (type) => {
        if (!type) return "";
        return type.toLowerCase() === 'meccan' ? t('meccan') : t('medinan');
    };

    const filteredSurahs = surahs.filter(s =>
        s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.includes(searchTerm)
    );

    return (
        <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex justify-center mb-4">
                    <Book className="text-gold-500 w-16 h-16" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight font-sans">{t('quran_majeed')}</h1>
                <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-8"></div>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-800 p-2 rounded-xl">
                        <Volume2 size={20} className="text-gold-500" />
                        <select
                            value={selectedQari}
                            onChange={(e) => { stopAllAudio(); setSelectedQari(e.target.value); }}
                            className="bg-transparent text-white outline-none text-sm"
                        >
                            {qaris.map(q => <option key={q.identifier} value={q.identifier} className="bg-emerald-950">{q.name}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-800 p-2 rounded-xl">
                        <Languages size={20} className="text-gold-500" />
                        <select
                            value={selectedTranslation}
                            onChange={(e) => setSelectedTranslation(e.target.value)}
                            className="bg-transparent text-white outline-none text-sm"
                        >
                            <option value="ur.jalandhry" className="bg-emerald-950 text-white">Urdu (Jalandhry)</option>
                            <option value="ur.kanzuliman" className="bg-emerald-950 text-white">Urdu (Ahmed Raza Khan)</option>
                            <option value="ur.junagarhi" className="bg-emerald-950 text-white">Urdu (Muhammad Junagarhi)</option>
                            <option value="ur.ahmedali" className="bg-emerald-950 text-white">Urdu (Ahmed Ali)</option>
                            <option value="ur.maududi" className="bg-emerald-950 text-white">Urdu (Maulana Maududi)</option>
                            <option value="ur.jawadi" className="bg-emerald-950 text-white">Urdu (Allama Jawadi - Shia)</option>
                            <option value="en.sahih" className="bg-emerald-950 text-white">English (Sahih)</option>
                            <option value="ar.muyassar" className="bg-emerald-950 text-white">Arbi Tafsir (Al-Muyassar)</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {selectedSurah ? (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="glass-panel p-6 md:p-12 relative overflow-hidden"
                    >
                        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 sticky top-24 z-20 bg-emerald-950/80 p-4 rounded-2xl backdrop-blur-md border border-emerald-800/50">
                            <button
                                onClick={() => { setSelectedSurah(null); stopAllAudio(); }}
                                className="flex items-center gap-2 text-gold-500 hover:text-white transition-colors group"
                            >
                                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-lg font-bold uppercase tracking-widest">{t('back')}</span>
                            </button>

                            <button
                                onClick={handleFullPlayToggle}
                                className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 ${isFullPlay ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-gold-500 text-emerald-950 shadow-lg shadow-gold-500/20 hover:bg-gold-400'}`}
                            >
                                {isFullPlay ? <StopCircle size={24} /> : <PlayCircle size={24} />}
                                {isFullPlay ? t('stop_audio') : t('play_full_surah')}
                            </button>
                        </div>

                        <div className="text-center mb-16">
                            <h2 className="text-5xl md:text-8xl font-arabic text-white mb-6 drop-shadow-lg">{selectedSurah[0]?.name}</h2>
                            <p className="text-3xl text-gold-500 font-sans tracking-wide">{selectedSurah[0]?.englishName}</p>
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <span className="bg-emerald-900 border border-gold-500/30 px-6 py-2 rounded-full text-gold-500 font-bold uppercase tracking-widest shadow-lg">
                                    {getRevelationType(selectedSurah[0]?.revelationType)}
                                </span>
                                <span className="text-emerald-100/40 text-2xl">•</span>
                                <span className="text-emerald-100/60 text-xl font-sans font-medium">
                                    {selectedSurah[0]?.numberOfAyahs} AYAHS
                                </span>
                            </div>
                        </div>

                        <div className="space-y-16">
                            {selectedSurah[0].ayahs.map((ayah, index) => (
                                <div key={ayah.number} id={`ayah-${ayah.number}`} className={`border-b border-emerald-800/20 pb-16 transition-all duration-500 ${playingAyah === ayah.number ? 'bg-emerald-900/10 -mx-6 px-6 rounded-3xl' : ''}`}>
                                    <div className="flex flex-col items-end gap-10">
                                        <div className="flex items-start gap-8 w-full justify-between flex-row-reverse">
                                            <button
                                                onClick={() => { isFullPlayRef.current = false; setIsFullPlay(false); playAudio(ayah.number); }}
                                                className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center transition-all ${playingAyah === ayah.number ? 'bg-gold-500 text-emerald-950 scale-110 shadow-xl shadow-gold-500/30' : 'bg-emerald-900/50 text-gold-500 border border-emerald-700/50 hover:border-gold-500'}`}
                                            >
                                                {playingAyah === ayah.number ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                                            </button>
                                            <p className={`text-4xl md:text-6xl font-arabic leading-[2.2] text-right transition-all duration-500 ${playingAyah === ayah.number ? 'text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-white'}`} dir="rtl">
                                                {ayah.text}
                                            </p>
                                        </div>
                                        <div className={`w-full text-left p-8 rounded-3xl border transition-all duration-500 ${playingAyah === ayah.number ? 'bg-emerald-900/40 border-gold-500/20' : 'bg-emerald-900/20 border-emerald-800/30'}`}>
                                            <p className={`text-xl md:text-2xl leading-relaxed italic transition-colors font-sans ${playingAyah === ayah.number ? 'text-emerald-50' : 'text-emerald-100/70'}`}>
                                                {selectedSurah[1]?.ayahs[index]?.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                        <div className="relative max-w-2xl mx-auto mb-20">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-100/40" size={28} />
                            <input
                                type="text"
                                placeholder={t('select_surah')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-emerald-900/30 border-2 border-emerald-800 rounded-3xl py-6 pl-20 pr-8 text-2xl text-white focus:outline-none focus:border-gold-500 transition-all shadow-2xl"
                            />
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-40 gap-8">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 rounded-full border-4 border-gold-500/20"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
                                </div>
                                <p className="text-gold-500 font-bold tracking-[0.3em] text-xl animate-pulse">LOADING DIVINE WORDS...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredSurahs.map((surah) => (
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -8 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={surah.number}
                                        onClick={() => handleSurahClick(surah.number)}
                                        className="glass-panel p-8 flex items-center justify-between group hover:border-gold-500/50 transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
                                            <Book size={140} />
                                        </div>
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="w-16 h-16 bg-emerald-900 shadow-2xl rounded-2xl flex items-center justify-center font-bold text-2xl text-gold-500 border border-emerald-700 group-hover:bg-gold-500 group-hover:text-emerald-950 transition-all duration-500">
                                                {surah.number}
                                            </div>
                                            <div className="text-left font-sans">
                                                <h3 className="text-2xl font-bold text-white tracking-wide">{surah.englishName}</h3>
                                                <p className="text-xs text-gold-500/60 uppercase tracking-[0.2em] font-bold">{surah.englishNameTranslation}</p>
                                            </div>
                                        </div>
                                        <div className="text-right relative z-10">
                                            <p className="text-3xl font-arabic text-gold-500 mb-2">{surah.name}</p>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-[10px] bg-gold-500/10 text-gold-500 border border-gold-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                                                    {getRevelationType(surah.revelationType)}
                                                </span>
                                                <p className="text-[10px] text-emerald-100/40 font-bold">{surah.numberOfAyahs} AYAHS</p>
                                            </div>
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
