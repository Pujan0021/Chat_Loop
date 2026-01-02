import React from "react";
import useAuthStore from "../store/useAuthStore.js";
const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <div className="relative w-full max-w-6xl h-(800px)">
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab == "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
