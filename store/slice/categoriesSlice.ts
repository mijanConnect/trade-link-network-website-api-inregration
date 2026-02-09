import { baseApi } from "../baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET CATEGORIES
    // ---------------------------------------
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,

      providesTags: ["Categories"],
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
    // GET DISCLAIMER
    // ---------------------------------------
    getDisclaimer: builder.query({
      query: (type: string) => ({
        url: `/disclaimers/${type}`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesServicesQuery,
  useGetCategoriesServicesQuestionsQuery,
  useCreateCustomerMutation,
  useCreateJobPostMutation,
  useGetDisclaimerQuery,
} = categoriesApi;
