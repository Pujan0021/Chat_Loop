import React from "react";
import useAuthStore from "../store/useAuthStore.js";
const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <div className="text-cyan-50">This is a chatpage.</div>
      <button className="z-10" onClick={logout}>
        LogOut
      </button>
    </>
  );
};

export default ChatPage;
