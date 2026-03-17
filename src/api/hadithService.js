import { HADITH_SUNNI_API, HADITH_SHIA_API } from './config';

export const fetchHadithBooks = async () => {
    try {
        const sunniCollections = [
            { slug: 'bukhari', name: 'Sahih al Bukhari', writer: 'Imam Bukhari' },
            { slug: 'muslim', name: 'Sahih Muslim', writer: 'Imam Muslim' },
            { slug: 'abudawud', name: 'Sunan Abu Dawud', writer: 'Imam Abu Dawud' },
            { slug: 'tirmidhi', name: 'Jami At Tirmidhi', writer: 'Imam Tirmidhi' },
            { slug: 'nasai', name: 'Sunan an Nasai', writer: 'Imam Nasai' },
            { slug: 'ibnmajah', name: 'Sunan Ibn Majah', writer: 'Imam Ibn Majah' },
            { slug: 'malik', name: 'Muwatta Malik', writer: 'Imam Malik' }
        ];

        const sunniBooks = sunniCollections.map(b => ({
            id: `sunni-${b.slug}`,
            bookSlug: b.slug,
            bookName: b.name,
            writerEnglishName: b.writer,
            hadiths_count: 'Multiple',
            source: 'sunni',
            maslak: 'Sunni'
        }));

        let shiaBooks = [];
        try {
            const shiaResponse = await fetch(`${HADITH_SHIA_API}/allbooks`);
            if (shiaResponse.ok) {
                const shiaData = await shiaResponse.json();
                shiaBooks = shiaData.map((book) => ({
                    id: `shia-${book.bookSlug}`,
                    bookSlug: book.bookSlug,
                    bookName: book.bookName,
                    writerEnglishName: book.author || "Ahlul-Bayt (A.S)",
                    hadiths_count: book.idRangeMax || 'Many',
                    source: 'shia',
                    maslak: 'Shia'
                }));
            }
        } catch (e) {
            console.error("Shia API fetch error:", e);
        }

        return [...sunniBooks, ...shiaBooks];
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};

export const fetchHadiths = async (bookSlug, source = 'sunni', section = 1) => {
    try {
        if (source === 'shia') {
            const startId = (section - 1) * 10 + 1;
            const fetchPromises = [];
            for (let i = startId; i < startId + 10; i++) {
                fetchPromises.push(
                    fetch(`${HADITH_SHIA_API}/${bookSlug}/${i}`)
                        .then(res => res.ok ? res.json() : null)
                        .catch(() => null)
                );
            }

            const results = await Promise.all(fetchPromises);
            const hadiths = results
                .filter(h => h !== null)
                .map(h => ({
                    hadithNumber: h.hadithId,
                    hadithArabic: h.arabicText || h.text,
                    hadithUrdu: h.englishText || h.text,
                    hadithEnglish: h.englishText || h.text,
                    chapter: { chapterEnglish: h.bookName || "Hadith" }
                }));

            return { data: hadiths };
        } else {
            // Sunni Multi-Language Merger
            // We fetch Arabic, Urdu, and English sections in parallel
            const languages = [
                { code: 'ara', key: 'hadithArabic' },
                { code: 'urd', key: 'hadithUrdu' },
                { code: 'eng', key: 'hadithEnglish' }
            ];

            const fetchPromises = languages.map(lang =>
                fetch(`${HADITH_SUNNI_API}/editions/${lang.code}-${bookSlug}/sections/${section}.json`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null)
            );

            const results = await Promise.all(fetchPromises);
            const arabicData = results[0];
            const urduData = results[1];
            const englishData = results[2];

            if (!arabicData) throw new Error("Could not fetch Arabic data");

            const mergedHadiths = arabicData.hadiths.map((h, index) => {
                const urduH = urduData?.hadiths?.find(u => u.hadithnumber === h.hadithnumber) || urduData?.hadiths[index];
                const englishH = englishData?.hadiths?.find(e => e.hadithnumber === h.hadithnumber) || englishData?.hadiths[index];

                return {
                    hadithNumber: h.hadithnumber,
                    hadithArabic: h.text?.trim(),
                    hadithUrdu: urduH?.text?.trim() || "اردو ترجمہ دستیاب نہیں",
                    hadithEnglish: englishH?.text?.trim() || "English translation not available",
                    chapter: {
                        chapterEnglish: arabicData.metadata.section[section] || "Hadith"
                    }
                };
            });

            return { data: mergedHadiths };
        }
    } catch (error) {
        console.error("Error fetching Hadiths:", error);
        return { data: [] };
    }
};
