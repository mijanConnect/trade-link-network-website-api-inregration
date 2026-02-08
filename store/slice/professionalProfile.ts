import { baseApi } from "../baseApi";

export const professionalProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET PROFESSIONAL PROFILE REVIEW
    // ---------------------------------------
    getProfessionalProfileReview: builder.query({
      query: ({
        id,
        jobPostId,
        page = 1,
        limit = 10,
      }: {
        id: string;
        jobPostId: string;
        page?: number;
        limit?: number;
      }) => ({
        url: `/customers/professionals/${id}/review?jobPostId=${jobPostId}&page=${page}&limit=${limit}`,
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
    // GET PROFESSIONAL PROFILE
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
