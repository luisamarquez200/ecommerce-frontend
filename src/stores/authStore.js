// src/stores/authStore.js
import { writable } from 'svelte/store';

const createAuthStore = () => {
    const { subscribe, set, update } = writable({
        isLoggedIn: false,
        user: null,
    });

    return {
        subscribe,
        login: (user) => update(state => ({ isLoggedIn: true, user })),
        logout: () => set({ isLoggedIn: false, user: null }),
    };
};

export const authStore = createAuthStore();
