import { baseApi } from "../baseApi";

export const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET DISCLAIMER
    // ---------------------------------------
    getDisclaimer: builder.query({
      query: (type: string) => ({
        url: `/disclaimers/${type}`,
        method: "GET",
      }),

      transformResponse: (response) =>
        response?.data ?? response?.user ?? response,
    }),
  }),
});

export const { useGetDisclaimerQuery } = termsApi;
