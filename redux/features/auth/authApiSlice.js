import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerSendOtp: builder.mutation({
      query: (userData) => ({
        url: "auth/register/send-otp",
        method: "POST",
        body: { ...userData },
      }),
    }),

    registerVerifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "auth/register/verify-otp",
        method: "POST",
        body: { ...otpData },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    forgotPasswordSendOtp: builder.mutation({
      query: (emailData) => ({
        url: "auth/forgot-password/send-otp",
        method: "POST",
        body: { ...emailData },
      }),
    }),

    forgotPasswordVerifyOtp: builder.mutation({
      query: (resetData) => ({
        url: "auth/forgot-password/verify-otp",
        method: "POST",
        body: { ...resetData },
      }),
    }),

    me: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterSendOtpMutation,
  useRegisterVerifyOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordSendOtpMutation,
  useForgotPasswordVerifyOtpMutation,
  useMeQuery,
  useLazyMeQuery,
} = authApiSlice;
