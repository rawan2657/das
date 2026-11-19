import { MotionConfig, motion } from "framer-motion";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import bgImage from "../../../assets/bg-image.jpeg";
import GlobalLoader from "../../common/Loader/GlobalLoader";
import PageLoader from "../../common/Loader/PageLoader";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function StoreLayout() {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: run on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-dvh flex-col overflow-x-clip font-sans text-slate-800 dark:text-slate-100">
        <div className="fixed inset-0 -z-10">
          <img src={bgImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl transition-colors duration-300 dark:bg-black/70" />
        </div>

        <Navbar />

        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-7xl flex-grow px-4 py-8 sm:px-6"
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </motion.main>

        <Footer />
        <GlobalLoader />
      </div>
    </MotionConfig>
  );
}
