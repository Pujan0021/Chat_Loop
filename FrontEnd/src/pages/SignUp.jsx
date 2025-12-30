import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { MessageCircleIcon, UserIcon } from "lucide-react";
const SignUp = () => {
  const [FormData, setFormData] = useState({
    fullName: " ",
    email: "",
    password: "",
  });
  const [signUp, isSigningUp] = useAuthStore();
  const handleSubmit = (e) => {};
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl"></div>
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
          <div className="w-full max-w-md">
            <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-200 mb-2">
              Create Account
            </h2>
            <p className="text-slate-400">Sign up for a new account</p>
          </div>

          <form
            action="
          "
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="" className="auth-input-label">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="auth-input-icon" />
                <input
                  type="text "
                  value={(FormData, fullName)}
                  placeholder="Bhojey"
                  className="input"
                  onChange={(e) =>
                    setFormData({ ...FormData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
