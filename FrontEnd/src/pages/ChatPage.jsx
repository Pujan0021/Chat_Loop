import React from "react";
import useAuthStore from "../store/useAuthStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatsLists from "../components/ChatsLists.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";
const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <div className="relative w-full max-w-6xl h-(800px)">
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab == "chats" ? <ChatsLists /> : <ContactList />}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
