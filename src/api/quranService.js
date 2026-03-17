import { QURAN_API_BASE_URL } from './config';

export const fetchSurahs = async () => {
    try {
        const response = await fetch(`${QURAN_API_BASE_URL}/surah`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching Surahs:", error);
        return [];
    }
};

export const fetchSurahDetail = async (surahNumber, edition = 'quran-uthmani') => {
    try {
        const path = edition.includes(',') ? `editions/${edition}` : edition;
        const response = await fetch(`${QURAN_API_BASE_URL}/surah/${surahNumber}/${path}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching Surah ${surahNumber}:`, error);
        return null;
    }
};

export const fetchAyahOfTheDay = async () => {
    try {
        const randomAyah = Math.floor(Math.random() * 6236) + 1;
        const response = await fetch(`${QURAN_API_BASE_URL}/ayah/${randomAyah}/editions/quran-uthmani,en.sahih,ur.jalandhry`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching random Ayah:", error);
        return null;
    }
};

export const fetchQaris = async () => {
    try {
        const response = await fetch(`${QURAN_API_BASE_URL}/edition?format=audio&type=versebyverse`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching Qaris:", error);
        return [];
    }
};
export const getAyahAudioUrl = (qari, ayahNumberFull) => {
    return `https://cdn.islamic.network/quran/audio/128/${qari}/${ayahNumberFull}.mp3`;
};
