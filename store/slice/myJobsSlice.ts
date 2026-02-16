import { baseApi } from "../baseApi";

export const myJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET PENDING JOBS
    // ---------------------------------------
    getPendingJobs: builder.query({
      query: ({
        status,
        page = 1,
        limit = 10,
      }: {
        status: string;
        page?: number;
        limit?: number;
      }) => ({
        url: `/jobPosts/mine?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),

      transformResponse: (response: {
        data?: unknown;
        pagination?: unknown;
        user?: unknown;
      }) => ({
        data: response?.data ?? response?.user ?? response,
        pagination: response?.pagination,
      }),

      providesTags: ["PendingJobs"],
    }),
    // ---------------------------------------
    // GET JOBS DETAILS
    // ---------------------------------------
    getJobsDetails: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/jobPosts/${id}/mine`,
        method: "GET",
      }),

      transformResponse: (response: {
        data?: unknown;
        success?: boolean;
        message?: string;
      }) => response,

      providesTags: ["PendingJobs"],
    }),
    // ---------------------------------------
    // GET INTERESTED JOBS
    // ---------------------------------------
    getInterestedJobs: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: `/jobRequests/interested-trade-persons?&page=${page}&limit=${limit}`,
        method: "GET",
      }),

      transformResponse: (response: {
        data?: unknown;
        pagination?: unknown;
        user?: unknown;
      }) => ({
        data: response?.data ?? response?.user ?? response,
        pagination: response?.pagination,
      }),

      providesTags: ["InterestedJobs"],
    }),
    // ---------------------------------------
    // GET HIRED HISTORY JOBS
    // ---------------------------------------
    getHiredHistoryJobs: builder.query({
      query: (status: string) => ({
        url: `/jobPosts/mine/hired?completedStatus=${status}`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["HiredJobs"],
    }),
    // ---------------------------------------
    // GET HIRED RECENT JOBS
    // ---------------------------------------
    getHiredRecentJobs: builder.query({
      query: (status: string) => ({
        url: `/jobPosts/mine/hired?completedStatus=${status}`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["HiredJobs"],
    }),
    // ---------------------------------------
    // GET CATEGORIES SERVICES
    // ---------------------------------------
    getCategoriesServices: builder.query({
      query: (id: string) => ({
        url: `/categories/${id}/services`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["Categories"],
    }),
    // ---------------------------------------
    // GET CATEGORIES SERVICES
    // ---------------------------------------
    getCategoriesServicesQuestions: builder.query({
      query: (id: string) => ({
        url: `/serviceQuestions/services/${id}`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["Categories"],
    }),
    // ---------------------------------------
    // CREATE CUSTOMER
    // ---------------------------------------
    createCustomer: builder.mutation({
      query: (payload) => ({
        url: `/customers`,
        method: "POST",
        body: payload,
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,
    }),
    // ---------------------------------------
    // CREATE JOB POST
    // ---------------------------------------
    createJobPost: builder.mutation({
      query: (payload) => ({
        url: `/jobPosts`,
        method: "POST",
        body: payload,
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["Categories"],
    }),
    // ---------------------------------------
    // CLOSE JOB POST
    // ---------------------------------------
    closeJobPost: builder.mutation({
      query: (jobPostId: string) => ({
        url: `/jobPosts/${jobPostId}/mine/close`,
        method: "POST",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["PendingJobs"],
    }),
    // ---------------------------------------
    // ACCEPT JOB REQUEST
    // ---------------------------------------
    acceptJobRequest: builder.mutation({
      query: (jobRequestId: string) => ({
        url: `/jobRequests/${jobRequestId}/accept`,
        method: "POST",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["InterestedJobs"],
    }),
    // ---------------------------------------
    // COMPLETE JOB POST
    // ---------------------------------------
    completeJobPost: builder.mutation({
      query: (jobPostId: string) => ({
        url: `/jobPosts/${jobPostId}/mine/complete`,
        method: "POST",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["HiredJobs"],
    }),
    // ---------------------------------------
    // CREATE JOB REVIEW
    // ---------------------------------------
    createJobReview: builder.mutation({
      query: ({
        jobRequestId,
        rating,
        comment,
      }: {
        jobRequestId: string;
        rating: number;
        comment: string;
      }) => ({
        url: `/jobRequests/${jobRequestId}/review`,
        method: "POST",
        body: { rating, comment },
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      invalidatesTags: ["HiredJobs"],
    }),



    // ---------------------------------------
    // Refund Job Post
    // ---------------------------------------
    refundJobPost: builder.mutation({
      query: (data: { jobPost: string; reason: string; image: File }) => {
        const formData = new FormData();
        formData.append("jobPost", data.jobPost);
        formData.append("reason", data.reason);
        formData.append("image", data.image);

        return {
          url: `/refundRequests`,
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["PendingJobs"],
    }),
  }),
});

export const {
  useGetPendingJobsQuery,
  useGetJobsDetailsQuery,
  useGetInterestedJobsQuery,
  useGetHiredHistoryJobsQuery,
  useGetHiredRecentJobsQuery,
  useGetCategoriesServicesQuery,
  useGetCategoriesServicesQuestionsQuery,
  useCreateCustomerMutation,
  useCreateJobPostMutation,
  useCloseJobPostMutation,
  useAcceptJobRequestMutation,
  useCompleteJobPostMutation,
  useCreateJobReviewMutation,
  useRefundJobPostMutation,
} = myJobsApi;
