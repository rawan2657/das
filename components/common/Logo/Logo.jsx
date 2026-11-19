import { Link } from "react-router-dom";
import logoImage from "../../../assets/logo1.png";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/home"
      aria-label="Veroya Store"
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-brand transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105">
        <img
          src={logoImage}
          alt="Veroya Store logo"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-wide text-slate-900 dark:text-white">
          VEROYA
        </span>
        <span className="text-lg font-extrabold tracking-wide text-slate-900 dark:text-white">
          STORE
        </span>
        <span className="mt-0.5 text-[7px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400">
          ONLINE STORE
        </span>
      </span>
    </Link>
  );
}
