import { create } from "zustand";
import React from 'react'
import axiosInstance from "../lib/axios.js"
import toast from "react-hot-toast";
import { Divide } from "lucide-react";
const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: false,
    isSiginingUp: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in auth checking", error);
            set({ authUser: null });


        } finally {
            set({
                isCheckingAuth: false
            })
        }
    },
    signup: async (data) => {
        set({ isSiginingUp: true });
        try {
            const res = await axiosInstance.post("/auth/signuppage", data);
            set({ authUser: res.data });
            toast.success("Account Created SuccessFully");


        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isSiginingUp: false })
        }
    }
}))
export default useAuthStore;