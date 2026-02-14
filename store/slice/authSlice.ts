import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // OTP VERIFY PHONE
    // Returns: { accessToken, resetToken }
    // ---------------------------------------
    otpVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => ({
        accessToken: response?.data?.accessToken,
        resetToken: response?.data?.resetToken,
      }),
      invalidatesTags: ["Profile"],
    }),

    // ---------------------------------------
    // RESEND OTP
    // ---------------------------------------
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // ---------------------------------------
    // LOGIN
    // ---------------------------------------
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      transformResponse: (data) => data,

      invalidatesTags: ["Profile"],
    }),

    // ---------------------------------------
    // REGISTER (SIGN UP)
    // ---------------------------------------
    register: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    // ---------------------------------------
    // FORGOT PASSWORD
    // ---------------------------------------
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    // ---------------------------------------
    // VERIFY EMAIL (FORGOT PASSWORD)
    // Returns: { resetToken }
    // ---------------------------------------
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => ({
        resetToken:
          response?.data?.resetToken ??
          response?.data?.token ??
          response?.resetToken ??
          response?.token ??
          response?.data,
      }),
    }),

    // ---------------------------------------
    // RESET PASSWORD
    // ---------------------------------------
    // RESET PASSWORD
    // Accepts: { newPassword, confirmPassword, resetToken }
    // Sends resetToken in Authorization header (no Bearer prefix)
    // ---------------------------------------
    resetPassword: builder.mutation({
      query: (data) => {
        const { resetToken, ...body } = data;

        return {
          url: "/auth/reset-password",
          method: "POST",
          body,
          headers: {
            Authorization: resetToken || "",
          },
        };
      },
    }),

    // ---------------------------------------
    // CHANGE PASSWORD
    // ---------------------------------------
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response,
    }),

    // ---------------------------------------
    // UPDATE PROFILE
    // ---------------------------------------
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // ---------------------------------------
    // GET PROFILE
    // ---------------------------------------
    profile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["Profile"],
    }),

    // ---------------------------------------
    // CREATE CUSTOMER
    // ---------------------------------------
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "/customers/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    // ---------------------------------------
    // UPDATE PROFILE (Form Data)
    // POST to /users/profile with form-data
    // Body: name, email, profileImage (file)
    // ---------------------------------------
    updateUserProfile: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.email) formData.append("email", data.email);
        if (data.profileImage)
          formData.append("profileImage", data.profileImage);

        return {
          url: "/users/profile",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),

    // ---------------------------------------
    // VERIFY PHONE
    // Returns: { accessToken }
    // ---------------------------------------
    verifyPhone: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-phone",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => ({
        accessToken: response?.data?.accessToken,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useResendOtpMutation,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useUpdateUserProfileMutation,
  useProfileQuery,
  useCreateCustomerMutation,
  useVerifyPhoneMutation,
} = authApi;
