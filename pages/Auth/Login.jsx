import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/app/api/apiSlice";
import logoImg from "../../assets/logo.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      const token =
        result?.token ||
        result?.accessToken ||
        result?.data?.token ||
        result?.data?.accessToken;
      if (!token) return;
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("authChange"));
      navigate("/home");
    } catch (err) {
      console.log("Login Error:", err);
    }
  };

  const tabActive =
    "flex-1 py-2 rounded-full text-[17px] bg-gradient-to-r from-orange-500 to-orange-400 text-black font-bold transition shadow-lg";
  const tabInactive =
    "flex-1 py-2 rounded-full text-[17px] text-white font-bold transition";
  const inputStyle =
    "bg-transparent outline-none w-full text-[15px] font-medium text-white placeholder:text-white caret-white";
  const inputWrap =
    "flex items-center gap-3 bg-white/10 border border-white/40 rounded-full px-4 py-3 backdrop-blur-sm";
  const mainBtn =
    "w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-black text-[19px] font-bold shadow-lg hover:scale-[1.02] transition disabled:opacity-50";

  // الايقونات برتقاني
  const iconStyle = "w-[22px] h-[22px] shrink-0 text-orange-500";

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

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-[400px] md:max-w-[420px]">
        <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 z-20 w-[70px] h-[70px] rounded-full overflow-hidden border-[3px] border-orange-500 shadow-[0_0_20px_6px_rgba(255,120,0,0.55)] bg-black flex items-center justify-center">
          <img
            src={logoImg}
            alt="Buy Logo"
            className="w-[85%] h-[85%] object-contain"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/40 rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] pt-[45px] pb-6 px-5 md:px-6">

          <div className="text-center mb-5">
            {isLogin ? (
              <>
                <h2 className="text-white text-[24px] font-bold leading-tight">Welcome back</h2>
                <p className="text-white/80 text-[14px] mt-1">Sign in to your account</p>
              </>
            ) : (
              <>
                <h2 className="text-white text-[24px] font-bold leading-tight">Create an account</h2>
                <p className="text-white/80 text-[14px] mt-1">Join us and start shopping</p>
              </>
            )}
          </div>

          <div className="flex bg-white/10 backdrop-blur border border-white/40 rounded-full p-1 mb-5">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={isLogin ? tabActive : tabInactive}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={!isLogin ? tabActive : tabInactive}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <form className="space-y-3.5" onSubmit={handleLogin}>
              <div className={inputWrap}>
                <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div className={inputWrap}>
                <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-white text-[13px] font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p className="text-white text-center text-[14px] font-semibold bg-red-500/60 py-2 rounded-full">
                  {error?.data?.message || "Something went wrong"}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={mainBtn}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-white/70"></div>
                <span className="text-white text-[14px]">or</span>
                <div className="flex-1 h-px bg-white/70"></div>
              </div>

              <p className="text-center text-[14px] text-white">
                Don't have an account?
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-white font-bold underline ml-1"
                >
                  Sign up
                </button>
              </p>
            </form>
          ) : (
            <form
              className="space-y-3.5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* دي اللي بقت برتقاني */}
              <div className={inputWrap}>
                <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></svg>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className={inputStyle}
                />
              </div>

              <div className={inputWrap}>
                <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className={inputStyle}
                />
              </div>

              <div className={inputWrap}>
                <svg className={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className={inputStyle}
                />
              </div>

              {/* اللي اتعدل هنا - بقى Sign up بدل Register */}
              <button type="submit" className={mainBtn}>
                Sign up
              </button>

              <p className="text-center text-[14px] text-white pt-1">
                Already have an account?
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-white font-bold underline ml-1"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}