 import { Suspense, lazy } from "react";
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Cookies from "js-cookie";

import StoreLayout from "./components/layout/StoreLayout/StoreLayout";
import PageLoader from "./components/common/Loader/PageLoader";
import ErrorPage from "./pages/error/ErrorPage";

const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/shop"));
const ProductDetails = lazy(() => import("./pages/Shop/ProductDetails"));

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));

const Cart = lazy(() => import("./pages/Cart/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Payment = lazy(() => import("./pages/Checkout/Payment"));
const MyOrders = lazy(() => import("./pages/Orders/MyOrders"));
const OrderDetails = lazy(() => import("./pages/Orders/OrderDetails"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const ProtectedRoute = () => {
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const RootRedirect = () => (
  <Navigate to={Cookies.get("token") ? "/home" : "/login"} replace />
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<RootRedirect />} />

      <Route element={<StoreLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />

    </Suspense>
  );
}