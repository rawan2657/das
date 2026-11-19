import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSendForgotPasswordOtpMutation,
  useVerifyForgotPasswordOtpMutation,
} from "../../redux/app/api/apiSlice";
import logoImg from "../../assets/logo.jpeg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);

  const [sendOtp, { isLoading: sending, error: sendError }] =
    useSendForgotPasswordOtpMutation();

  const [verifyOtp, { isLoading: verifying, error: verifyError }] =
    useVerifyForgotPasswordOtpMutation();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const result = await sendOtp({ email }).unwrap();

      alert(result?.message || "OTP sent successfully");

      setStep(2);
    } catch (err) {
      alert(err?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const result = await verifyOtp({
        email,
        otp,
        newPassword,
      }).unwrap();

      alert(result?.message || "Password reset successfully");

      setStep(1);
      setOtp("");
      setNewPassword("");

      window.location.assign("/login");
    } catch (err) {
      alert(err?.data?.message || "Invalid OTP or password");
    }
  };

  // نفس ستايل الـ Login بالظبط
  const inputStyle =
    "bg-transparent outline-none w-full text-[15px] font-medium text-white placeholder:text-white caret-white";
  const inputWrap =
    "flex items-center gap-3 bg-white/10 border border-white/40 rounded-full px-4 py-3 backdrop-blur-sm";
  const mainBtn =
    "w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-black text-[19px] font-bold shadow-lg hover:scale-[1.02] transition disabled:opacity-50";
  const iconStyle = "w-[22px] h-[22px] shrink-0 text-orange-500";
  const labelStyle = "block text-white text-[14px] font-semibold ml-2 mb-1.5";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-[70px] pb-8 font-sans relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: white;
        }
        input { color: white !important; }
      `}</style>

      {/* نفس خلفية الـ Login */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-[400px] md:max-w-[420px]">
        {/* نفس لوجو الـ Login - 70px */}
        <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 z-20 w-[70px] h-[70px] rounded-full overflow-hidden border-[3px] border-orange-500 shadow-[0_0_20px_6px_rgba(255,120,0,0.55)] bg-black flex items-center justify-center">
          <img
            src={logoImg}
            alt="Buy Logo"
            className="w-[85%] h-[85%] object-contain"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/40 rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] pt-[45px] pb-6 px-5 md:px-6">

          <div className="text-center mb-5">
            <h1 className="text-white text-[24px] font-bold leading-tight">
              Forgot Password?
            </h1>
            <p className="text-white/80 text-[14px] mt-1">
              {step === 1
                ? "Enter your email to receive a verification code"
                : "Enter the OTP sent to your email and your new password"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              {/* اللي اتزود هنا - كلمة Email فوق الـ Field */}
              <div>
                <label className={labelStyle}>Email</label>
                <div className={inputWrap}>
                  <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>

              {sendError && (
                <p className="text-white text-center text-[14px] font-semibold bg-red-500/60 py-2 rounded-full">
                  {sendError?.data?.message || "Something went wrong"}
                </p>
              )}

              {/* اللي اتغير هنا - Send Reset Code */}
              <button
                type="submit"
                disabled={sending}
                className={mainBtn}
              >
                {sending ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-3.5">
              <div>
                <label className={labelStyle}>Verification Code</label>
                <div className={inputWrap}>
                  <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>New Password</label>
                <div className={inputWrap}>
                  <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputStyle}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {verifyError && (
                <p className="text-white text-center text-[14px] font-semibold bg-red-500/60 py-2 rounded-full">
                  {verifyError?.data?.message || "Something went wrong"}
                </p>
              )}

              <button
                type="submit"
                disabled={verifying}
                className={mainBtn}
              >
                {verifying ? "Updating..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-white text-[13px] font-semibold hover:underline"
              >
                Change Email
              </button>
            </form>
          )}

          <div className="text-center mt-5">
            <Link
              to="/login"
              className="text-white text-[14px] font-bold underline"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}