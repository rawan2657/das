import { motion } from "framer-motion";
import Cookies from "js-cookie";
import {
  ArrowUp,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/logo1.png";

const exploreLinks = [
  { to: "/orders", label: "MyOrders" },
  { to: "/shop", label: "Shop" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/profile", label: "Profile" },
];

const accountLinksIn = [
  { to: "/orders", label: "My Orders" },
  { to: "/profile", label: "Profile" },
];
const accountLinksOut = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Create account" },
];

const socials = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@veroyastore.com" },
];

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const heading = "mb-4 text-sm font-bold text-slate-900 dark:text-white";

const linkCls =
  "relative inline-block text-sm text-slate-600 transition-colors duration-200 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-orange-500 after:transition-transform after:duration-300 hover:after:scale-x-100";

function LinkList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className={linkCls}>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const backToTop = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
};

export default function Footer() {
  const token = Cookies.get("token");

  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-slate-200/70 bg-white/70 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-black/55">
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-orange-500 via-orange-400 to-transparent"
      />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6"
      >

        <motion.div
          variants={rise}
          className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]"
        >
          <div>
                    <Link
                      to="/home"
                      className="inline-flex items-center"
                    >
                      <img
                        src={logoImage}
                        alt="Logo"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-slate-200/70 text-slate-700 transition duration-200 hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-orange-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explore">
            <h4 className={heading}>Explore</h4>
            <LinkList items={exploreLinks} />
          </nav>

          <nav aria-label="Account">
            <h4 className={heading}>Account</h4>
            <LinkList items={token ? accountLinksIn : accountLinksOut} />
          </nav>

          <div>
            <h4 className={heading}>Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:hello@veroyastore.com" className={linkCls}>
                  hello@veroyastore.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin size={15} className="shrink-0 text-orange-500" />
                Delivering across Egypt
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          className="flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-600 dark:text-slate-400 dark:border-white/10 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Veroya Store. All rights reserved.</p>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-4 py-2 font-semibold text-slate-700 transition duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-orange-500 dark:hover:bg-orange-500"
          >
            Back to top
            <ArrowUp
              size={16}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
