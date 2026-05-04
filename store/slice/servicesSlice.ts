import { baseApi } from "../baseApi";

export type DynamicServiceLocationRelatedService = {
  _id: string;
  name: string;
  slug: string;
};

export type DynamicServiceLocationRelatedLocation = {
  _id: string;
  name: string;
  slug: string;
};

export type DynamicServiceLocationFaq = {
  question: string;
  answer: string;
};

export type DynamicServiceLocationGuide = {
  title: string;
  content: string;
};

export type DynamicServiceLocationResponse = {
  service: {
    name: string;
    slug: string;
    faqs: DynamicServiceLocationFaq[];
    guides: DynamicServiceLocationGuide[];
  };
  location: {
    name: string;
    slug: string;
    type: string;
    hierarchy: Array<{
      name: string;
      slug: string;
      type: string;
    }>;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonical: string;
    h1: string;
  };
  content: {
    localNotes: string;
    relatedServices: DynamicServiceLocationRelatedService[];
    relatedLocations: DynamicServiceLocationRelatedLocation[];
  };
};

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDynamicServiceLocation: builder.query<
      DynamicServiceLocationResponse,
      { service: string; location: string }
    >({
      query: ({ service, location }) => ({
        url: `/service-locations/dynamic/${service}/${location}`,
        method: "GET",
      }),
      transformResponse: (
        response:
          | { data?: DynamicServiceLocationResponse }
          | DynamicServiceLocationResponse,
      ) => {
        return "data" in response && response.data
          ? response.data
          : (response as DynamicServiceLocationResponse);
      },
      providesTags: ["Services"],
    }),
  }),
});

export const { useGetDynamicServiceLocationQuery } = servicesApi;
