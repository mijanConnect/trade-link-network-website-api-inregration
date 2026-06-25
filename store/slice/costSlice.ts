import { baseApi } from "../baseApi";

export type GuideDropdownItem = {
  _id: string;
  name: string;
  slug: string;
};

type GuideDropdownResponse = {
  success: boolean;
  message: string;
  data: GuideDropdownItem[];
};

export const costApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuideDropdownServices: builder.query<GuideDropdownItem[], { type: string }>({
      query: ({ type }) => ({
        url: "/guidePages/dropdown-services",
        method: "GET",
        params: { type },
      }),
      transformResponse: (response: GuideDropdownResponse) => response.data ?? [],
      providesTags: ["Services"],
    }),
    getGuideDropdownLocations: builder.query<
      GuideDropdownItem[],
      { type: string; serviceId: string }
    >({
      query: ({ type, serviceId }) => ({
        url: "/guidePages/dropdown-locations",
        method: "GET",
        params: { type, serviceId },
      }),
      transformResponse: (response: GuideDropdownResponse) => response.data ?? [],
      providesTags: ["Locations"],
    }),
  }),
});

export const { useGetGuideDropdownServicesQuery, useGetGuideDropdownLocationsQuery } =
  costApi;
