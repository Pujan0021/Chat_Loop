import React from "react";
import "./index.css";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/signuppage" element={<SignUp />} />
      <Route path="/loginpage" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
