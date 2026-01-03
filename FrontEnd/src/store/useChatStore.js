import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable")) === true,
    toggleSound: () => {
        localStorage.setItem("isSoundEnable", !get().isSoundEnable)
        set({ isSoundEnable: !get().isSoundEnable })

    },
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contact");
            set({ allContacts: res.data })
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isUsersLoading: false })
        }
    },
    getMyChatPatterns: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contact");
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isUsersLoading: false })
        }
    }
}))
export default useChatStore