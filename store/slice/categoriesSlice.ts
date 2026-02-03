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
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
