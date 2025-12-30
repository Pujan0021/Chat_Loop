import { create } from "zustand";
import React from 'react'

const useAuthStore = create((set, get) => ({
    isLoading: false,
    isLoggedIn: false,
    isLoggedOut: true,
    logIn: () => {
        set({
            isLoading: true,
            isLoggedIn: true,
            isLoggedOut: false
        });

        console.log(get());
    }
}))



export default useAuthStore;