import { baseApi } from "../baseApi";

// ---------------------------------------
// Types for "My Reviews" API
// ---------------------------------------
export interface MyReview {
  _id: string;
  jobRequest: string;
  professional: string;
  customer: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface MyReviewsPagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface MyReviewsResponse {
  success: boolean;
  message: string;
  pagination: MyReviewsPagination;
  data: MyReview[];
}

export interface GetMyReviewsArgs {
  page?: number;
  limit?: number;
}

const myProfileSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),

    myReviews: builder.query<MyReviewsResponse, GetMyReviewsArgs | void>({
      query: (args) => {
        const params = new URLSearchParams();
        const queryArgs = args || {};

        if (queryArgs.page) params.set("page", queryArgs.page.toString());
        if (queryArgs.limit) params.set("limit", queryArgs.limit.toString());

        const queryString = params.toString();

        return {
          url: `/reviews/professionals${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response: MyReviewsResponse) => response,
    }),
  }),
});

export const { useGetMyProfileQuery, useMyReviewsQuery } = myProfileSlice;