/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AlertMessage } from "../../shared/Alert";
import { AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa6";
import { useNavigate } from "@tanstack/react-router";
import api from "../../services/axios.service";
import { useAuth } from "../../store/AuthContext";

export function Login() {
  const [formUser, setFormUser] = useState({
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    if (from === "protected") {
      setShowAlert({
        show: true,
        message: "Silakan login terlebih dahulu!",
        type: "error",
      });
      // Hapus query string tanpa reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const handleChangeInput = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formUser;

    if (!username || !password) {
      setShowAlert({
        show: true,
        message: "Username & Password is Required!",
        type: "error",
      });
      return;
    }

    try {
      const response = await api.post("/auth/login", formUser);
      const user = response.data.data.user;
      const token = response.data.data?.token;

      if (token) {
        login(user, token);
        setShowAlert({
          show: true,
          message: `login berhasil!`,
          type: "success",
        });
        setTimeout(() => {
          navigate({ to: "/" });
        }, 1500);
      } else {
        setShowAlert({
          show: true,
          message: "Login gagal: Token tidak diterima!",
          type: "error",
        });
      }
    } catch (err) {
      setShowAlert({
        show: true,
        message: "Login gagal!",
        type: "error",
      });
    }
  };

  const handleForgetPassword = () => {
    navigate({ to: "/" });
  };
  return (
    <>
      <div className="relative h-screen grid grid-cols-1 lg:grid lg:grid-cols-3 bg-gray-50">
        <div className="brand hidden lg:block justify-center items-center col-span-2 relative h-screen overflow-hidden rounded-e-[20em]">
          {/* Background Image */}
          <div className="absolute  inset-0 bg-login bg-cover bg-center brightness-50 blur-sm"></div>

          {/* Konten di atasnya */}
          <div className="relative z-10 text-white flex flex-col items-center justify-center h-full">
            <img src="/icon/icon-dms.png" className="w-28" alt="" />
            <h1 className="text-4xl font-bold mt-4 tracking-wide">KLOUDIA</h1>
            <p className="mt-2 text-lg font-semibold italic">
              Revolutionizing the Way You Manage Documents
            </p>
            <p className="mt-1 text-sm">A secure, smart, and scalable DMS</p>
            <p className="mt-1 text-sm">
              Crafted with care by PT Padama Bahtera Labelindo
            </p>

            <hr className="my-4 w-1/2 border-gray-300/30" />

            <p className="text-sm opacity-90">
              Say goodbye to paper chaos, and hello to intelligent archiving.
            </p>
            <p className="text-sm opacity-90">
              Organize, access, and share files — anytime, anywhere.
            </p>
            <p className="text-sm opacity-90">
              Designed to empower your workflow with precision and speed.
            </p>

            <p className="mt-4 text-xs italic opacity-70">
              “Your documents deserve more than just storage — they deserve
              clarity.”
            </p>
          </div>
        </div>

        {/* FORM LOGIN */}
        <div className="box-login w-full md:p-32 items-center justify-center mx-auto flex flex-col col-span-1 ">
          <h1 className="text-primary font-bold text-2xl md:text-3xl">
            LOG IN
          </h1>
          <div className="formLogin">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative mt-12 ">
                <input
                  type="text"
                  name="username"
                  onChange={(e) => handleChangeInput(e)}
                  className="w-full bg-transparent border-b border-gray-700 px-12 py-2 focus:ring-gray-50 focus:border-b-2 focus:outline-none"
                  placeholder="username"
                />
                <span className="absolute left-2 top-3 text-gray-700">
                  <FaUser />
                </span>
              </div>
              <div className="relative mt-12 group">
                <input
                  name="password"
                  minLength={6}
                  type={showPassword ? "text" : `password`}
                  onChange={(e) => handleChangeInput(e)}
                  className="w-full  bg-transparent border-b  border-gray-700 px-12 py-2 focus:ring-gray-50 focus:border-b-2 focus:outline-none"
                  placeholder="password"
                />
                <span className="absolute left-2 top-3 text-gray-700">
                  <FaKey />
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-3 text-gray-700"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div className="buttonSubmit flex items-center p-2">
                <button className="bg-primary px-8 py-3 rounded-xl text-white text-sm">
                  SIGN IN
                </button>
                <span className="text-sm text-gray-500 ms-auto">
                  <input type="checkbox" /> <span>Remember Account</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleForgetPassword()}
                className=" text-primary text-sm"
              >
                Forget your password ?
              </button>
            </form>
          </div>
        </div>

        <AnimatePresence>
          {showAlert.show && (
            <AlertMessage
              message={`${showAlert.message}`}
              type={`${showAlert.type}`}
              onClose={() =>
                setShowAlert({ show: false, message: "", type: "" })
              }
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
