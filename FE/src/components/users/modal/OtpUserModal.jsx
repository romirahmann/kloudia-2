/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";
import moment from "moment";
import { useTimer } from "react-timer-hook";
import api from "../../../services/axios.service";
import { AlertMessage } from "../../../shared/Alert";
import { AnimatePresence } from "motion/react";

export function OtpUserModal({ data = [], setModalType }) {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isSend, setIsSend] = useState(false);
  const [formOtp, setFormOtp] = useState({
    kode1: "",
    kode2: "",
    kode3: "",
    kode4: "",
  });
  const inputRefs = useRef([]);

  const expiryTimestamp = useMemo(
    () => moment().add(1, "minutes").toDate(),
    [isSend]
  );

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsSend(false),
  });

  const otp = useMemo(() => {
    return `${formOtp.kode1}${formOtp.kode2}${formOtp.kode3}${formOtp.kode4}`;
  }, [formOtp]);

  useEffect(() => {
    if (otp.length === 4) {
      handleValidateOtp(otp);
    }
  }, [otp]);

  const sendOtp = async () => {
    let email = {
      email: data.email,
    };
    if (!email) {
      console.log("Email Not Found!");
      return;
    }
    try {
      let response = await api.put("/master/otp", email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOtp = useCallback((e, index) => {
    const { name, value } = e.target;
    if (/^\d?$/.test(value)) {
      setFormOtp((prev) => ({ ...prev, [name]: value }));
    }

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleResendOtp = useCallback(() => {
    setFormOtp({ kode1: "", kode2: "", kode3: "", kode4: "" });
    setIsSend(true);
    restart(moment().add(1, "minutes").toDate());
  }, [restart]);

  const handleSendOtp = useCallback(() => {
    sendOtp();
    setIsSend(true);
    restart(moment().add(1, "minutes").toDate());
  }, []);

  const handleValidateOtp = async (kode_otp) => {
    let newData = {
      email: data.email,
      otp: kode_otp,
    };

    console.log(newData);

    try {
      let response = await api.post("/master/validate-otp", newData);
      console.log(response.data.data);
      setModalType("RESET");
    } catch (error) {
      let statusError = error.response.status;
      if (statusError === 400) {
        setAlert({
          show: true,
          message: "Email & OTP Require!",
          type: "warning",
        });
        return;
      }
      if (statusError !== 401) {
        setAlert({
          show: true,
          message: "Email Not Found!",
          type: "error",
        });
        return;
      }
      setAlert({
        show: true,
        message: "Invalid OTP Code!",
        type: "error",
      });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!formOtp[`kode${index + 1}`] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="reset">
      <div className="icon flex justify-center">
        <img
          src="/icon/reset-password.png"
          className="w-36 lg:w-52"
          alt="Reset password"
        />
      </div>

      {isSend ? (
        <div className="verificationOtp">
          <div className="formInput grid grid-cols-4 gap-3">
            {["kode1", "kode2", "kode3", "kode4"].map((kode, index) => (
              <Input
                key={index}
                name={kode}
                type="text"
                maxLength="1"
                value={formOtp[kode]}
                className="text-center"
                onChange={(e) => handleChangeOtp(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <div className="timer text-center text-xs my-2">
            <span className="me-2">Expired In:</span>
            <span>{minutes}</span>:
            <span>{seconds.toString().padStart(2, "0")}</span>
          </div>
          <p className="text-xs mt-2 text-center">
            <span className="text-gray-800">Didn't receive a code? </span>
            <button
              onClick={handleResendOtp}
              className="font-bold text-gray-900"
            >
              Resend Code
            </button>
          </p>
        </div>
      ) : (
        <div className="btn flex flex-col items-center mt-5">
          <p className="text-sm my-2 text-gray-800">
            Click button to get OTP Code
          </p>
          <Button
            funct={handleSendOtp}
            style="bg-green-500 rounded-xl text-white"
          >
            Get OTP
          </Button>
        </div>
      )}
      <AnimatePresence>
        {alert.show && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ show: false, message: "", type: "" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
