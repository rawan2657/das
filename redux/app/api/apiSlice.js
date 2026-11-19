
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "../../../config/environment";

const dynamicBaseUrl = environment.isDevelopment
  ? "/api"
  : environment.baseUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: dynamicBaseUrl,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args?.url;

  const isAuthForm = /^\/?auth\/(login|register|forgot-password)/.test(
    url ?? ""
  );

  if (result.error?.status === 401 && !isAuthForm) {
    const hadToken = localStorage.getItem("token");

    localStorage.removeItem("token");

    window.dispatchEvent(new Event("authChange"));

    if (hadToken) {
      window.location.assign("/login");
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "Cart",
    "Wishlist",
    "Product",
    "Review",
    "Order",
    "User",
  ],

  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const token =
            data?.token ||
            data?.accessToken ||
            data?.data?.token ||
            data?.data?.accessToken;

          if (token) {
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("authChange"));
          }
        } catch (error) {
          console.log("Login Error:", error);
        }
      },
    }),

    // Send OTP
    sendForgotPasswordOtp: builder.mutation({
      query: (userData) => ({
        url: "/auth/forgot-password/send-otp",
        method: "POST",
        body: userData,
      }),
    }),

    // Verify OTP and reset password
    verifyForgotPasswordOtp: builder.mutation({
      query: (userData) => ({
        url: "/auth/forgot-password/verify-otp",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendForgotPasswordOtpMutation,
  useVerifyForgotPasswordOtpMutation,
} = apiSlice;
