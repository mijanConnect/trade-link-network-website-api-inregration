import { baseApi } from "../baseApi";

export const myJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET CATEGORIES
    // ---------------------------------------
    getPendingJobs: builder.query({
      query: (status: string) => ({
        url: `/jobPosts/mine?status=${status}`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["PendingJobs"],
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
  }),
});

export const {
  useGetPendingJobsQuery,
  useGetCategoriesServicesQuery,
  useGetCategoriesServicesQuestionsQuery,
  useCreateCustomerMutation,
  useCreateJobPostMutation,
} = myJobsApi;
