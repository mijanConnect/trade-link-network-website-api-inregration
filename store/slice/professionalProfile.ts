import { baseApi } from "../baseApi";

export const professionalProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET PENDING JOBS
    // ---------------------------------------
    getProfessionalProfileReview: builder.query({
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

      providesTags: ["ProfessionalProfile"],
    }),
    // ---------------------------------------
    // GET JOBS DETAILS
    // ---------------------------------------
    getProfessionalProfile: builder.query({
      query: ({ id, jobPostId }: { id: string; jobPostId: string }) => ({
        url: `/customers/professionals/${id}/profile?jobPostId=${jobPostId}`,
        method: "GET",
      }),

      transformResponse: (response: {
        data?: unknown;
        success?: boolean;
        message?: string;
      }) => response,

      providesTags: ["ProfessionalProfile"],
    }),
  }),
});

export const {
  useGetProfessionalProfileReviewQuery,
  useGetProfessionalProfileQuery,
} = professionalProfileApi;
