import Loader from "./Loader";

export default function PageLoader({ label = "Loading", size = "lg" }) {
  return <Loader label={label} size={size} className="absolute inset-0" />;
}
