/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AlertMessage } from "../../shared/Alert";
import { AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa6";
import { useNavigate } from "@tanstack/react-router";
import api from "../../services/axios.service";
import { useAuth } from "../../store/AuthContext";
import { ParticleBackground } from "../../components/ParticalBackground";

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
      <div className="relative h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-50">
        {/* BRAND */}
        <div className="brand hidden md:block lg:col-span-2 relative h-full overflow-hidden ">
          {/* Background Particle hanya untuk area brand */}
          <div className="absolute inset-0 z-0">
            <ParticleBackground />
          </div>

          {/* Konten di atas particle */}
          <div className="relative z-10 text-white flex flex-col items-center justify-center h-full px-12 text-center">
            <img src="/icon/icon-dms.png" className="w-20 lg:w-28" alt="" />
            <h1 className="text-2xl lg:text-4xl font-bold mt-4 tracking-wide">
              KLOUDIA
            </h1>

            <p className="mt-2 text-[16px] lg:text-lg font-semibold italic">
              Revolutionizing the Way You Manage Documents
            </p>

            <div className="desc text-[12px] lg:text-sm">
              <p className="mt-1 ">A secure, smart, and scalable DMS</p>
              <p className="mt-1 ">
                Crafted with care by PT Padama Bahtera Labelindo
              </p>
            </div>

            <hr className="my-4 w-1/2 border-gray-300/30" />

            <div className="text-[12px] opacity-80">
              <p>
                Say goodbye to paper chaos, and hello to intelligent archiving.
              </p>
              <p>Organize, access, and share files — anytime, anywhere.</p>
              <p>Designed to empower your workflow with precision and speed.</p>
            </div>

            <p className="mt-4 text-[10px] italic opacity-70">
              “Your documents deserve more than just storage — they deserve
              clarity.”
            </p>
          </div>
        </div>

        {/* FORM LOGIN */}
        <div className="box-login z-10 bg-primary md:bg-white w-full md:py-32 lg:col-span-1 ">
          <div className="iconBrand flex md:hidden items-center mt-10 ms-10">
            <img src="/icon/icon-dms.png" className="w-5" alt="" />
            <p className="text-xl font-bold ms-2 text-white">Kloudia</p>
          </div>

          <div className="flex flex-col py-36 items-center justify-center mt-5">
            <h1 className="text-white md:text-primary font-bold text-2xl md:text-3xl">
              LOG IN
            </h1>
            <div className="formLogin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative mt-12">
                  <input
                    type="text"
                    name="username"
                    onChange={(e) => handleChangeInput(e)}
                    className="w-full text-white md:text-gray-700 bg-transparent border-b border-gray-700 px-12 py-2 focus:ring-gray-50 focus:border-b-2 focus:outline-none"
                    placeholder="username"
                  />
                  <span className="absolute left-2 top-3 text-gray-100 md:text-gray-700">
                    <FaUser />
                  </span>
                </div>
                <div className="relative mt-12 group">
                  <input
                    name="password"
                    minLength={6}
                    type={showPassword ? "text" : `password`}
                    onChange={(e) => handleChangeInput(e)}
                    className="w-full text-white lg:text-gray-700  bg-transparent border-b  border-gray-700 px-12 py-2 focus:ring-gray-50 focus:border-b-2 focus:outline-none"
                    placeholder="password"
                  />
                  <span className="absolute left-2 top-3 text-gray-100 md:text-gray-700">
                    <FaKey />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-gray-100 md:text-gray-700"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <div className="buttonSubmit flex items-center lg:p-2">
                  <button className="bg-green-800 mt-5 lg:bg-primary px-4 lg:px-8 py-3 rounded-xl text-white text-sm">
                    SIGN IN
                  </button>
                  <span className="text-sm mt-5 text-gray-500 ms-auto">
                    <input type="checkbox" /> <span>Remember Account</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleForgetPassword()}
                  className="text-blue-400 md:text-primary text-sm"
                >
                  Forget your password ?
                </button>
              </form>
            </div>
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
