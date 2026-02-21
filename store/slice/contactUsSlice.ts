import { baseApi } from "../baseApi";

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // SEND MESSAGE
    // ---------------------------------------
    sendMessage: builder.mutation({
      query: ({ email, issueTitle, message }) => ({
        url: `/admin/issues/send`,
        method: "POST",
        body: { email, issueTitle, message },
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["HiredJobs"],
    }),

    userDataSendAdmin: builder.mutation({
      query: ({body }) => ({
        url: `/admin/contact-us`,
        method: "POST",
        body: body,
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["HiredJobs"],
    }),
  }),
});

export const { useSendMessageMutation, useUserDataSendAdminMutation } = contactUsApi;
