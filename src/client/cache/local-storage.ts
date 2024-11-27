import {LocalStorageEnum} from "./local-storage.enum";

// Save in localStorage
export const setCache = (key: LocalStorageEnum, value: any) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
    }
};

// Get in localStorage
export const getCache = (key: LocalStorageEnum): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    return null;
};

// Delete in localStorage
export const removeItemCache = (key: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

// Delete all localStorage
export const clearCache = () => {
    if (typeof window !== "undefined") {
        localStorage.clear();
    }
};