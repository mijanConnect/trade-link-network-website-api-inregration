import { baseApi } from "../baseApi";

// ============================================
// Types & Interfaces for Locations API
// ============================================
export interface LocationItem {
  _id: string;
  name: string;
  slug: string;
  type: "region" | "county" | "city" | "town";
  parentId?:
    | {
        _id: string;
        name: string;
        slug: string;
        type: string;
      }
    | string;
  isActive: boolean;
  isIndexable: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface ActiveLocationsResponse {
  success: boolean;
  message: string;
  pagination: Pagination;
  data: LocationItem[];
}

// ============================================
// Types for Service Location Dynamic Data
// ============================================
export interface ServiceData {
  name: string;
  slug: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  guides: Array<{
    title: string;
    content: string;
  }>;
}

export interface LocationHierarchy {
  name: string;
  slug: string;
  type: string;
}

export interface LocationDataDetail {
  name: string;
  slug: string;
  type: string;
  hierarchy: LocationHierarchy[];
}

export interface RelatedService {
  _id: string;
  name: string;
  slug: string;
}

export interface ServiceLocationContent {
  localNotes: string;
  relatedServices: RelatedService[];
}

export interface ServiceLocationSEO {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  h1: string;
}

export interface ServiceLocationDataResponse {
  success: boolean;
  message: string;
  data: {
    service: ServiceData;
    location: LocationDataDetail;
    seo: ServiceLocationSEO;
    content: ServiceLocationContent;
  };
}

// ============================================
// RTK Query Endpoints for Locations
// ============================================
export interface GetActiveLocationsArgs {
  type?: "region" | "county" | "city" | "town";
  parentId?: string;
  page?: number;
  limit?: number;
}

const locationSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET active locations with type or parentId filter
    getActiveLocations: builder.query<
      ActiveLocationsResponse,
      GetActiveLocationsArgs
    >({
      query: (args) => {
        const params = new URLSearchParams();

        if (args.type) {
          params.append("type", args.type);
        }

        if (args.parentId) {
          params.append("parentId", args.parentId);
        }

        // Default to page 1 if not specified
        params.append("page", String(args.page || 1));

        // Default to limit 100 for getting all items (adjust if needed)
        params.append("limit", String(args.limit || 100));

        return {
          url: `/locations/active?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ActiveLocationsResponse) => response,
      // Tag all regions, counties, cities, towns for cache invalidation
      providesTags: (result) => {
        if (!result?.data) return [{ type: "Locations" as const, id: "list" }];

        const tags: typeof result.data extends undefined
          ? never
          : Array<{ type: "Locations"; id: string }> = [
          { type: "Locations" as const, id: "list" },
        ];

        result.data.forEach((location) => {
          tags.push({ type: "Locations" as const, id: location._id });
        });

        return tags;
      },
    }),

    // GET regions only
    getRegions: builder.query<
      ActiveLocationsResponse,
      { page?: number; limit?: number }
    >({
      query: (args) => {
        const params = new URLSearchParams();
        params.append("type", "region");
        params.append("page", String(args?.page || 1));
        params.append("limit", String(args?.limit || 200));

        return {
          url: `/locations/active?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ActiveLocationsResponse) => response,
      providesTags: ["Locations"],
    }),

    // GET counties by region parent ID
    getCountiesByRegion: builder.query<
      ActiveLocationsResponse,
      { regionId: string; page?: number; limit?: number }
    >({
      query: (args) => {
        const params = new URLSearchParams();
        params.append("parentId", args.regionId);
        params.append("page", String(args?.page || 1));
        params.append("limit", String(args?.limit || 200));

        return {
          url: `/locations/active?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ActiveLocationsResponse) => response,
      providesTags: () => [{ type: "Locations" as const, id: "counties" }],
    }),

    // GET cities by county parent ID
    getCitiesByCounty: builder.query<
      ActiveLocationsResponse,
      { countyId: string; page?: number; limit?: number }
    >({
      query: (args) => {
        const params = new URLSearchParams();
        params.append("parentId", args.countyId);
        params.append("page", String(args?.page || 1));
        params.append("limit", String(args?.limit || 200));

        return {
          url: `/locations/active?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ActiveLocationsResponse) => response,
      providesTags: () => [{ type: "Locations" as const, id: "cities" }],
    }),

    // GET towns by city parent ID
    getTownsByCity: builder.query<
      ActiveLocationsResponse,
      { cityId: string; page?: number; limit?: number }
    >({
      query: (args) => {
        const params = new URLSearchParams();
        params.append("parentId", args.cityId);
        params.append("page", String(args?.page || 1));
        params.append("limit", String(args?.limit || 200));

        return {
          url: `/locations/active?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ActiveLocationsResponse) => response,
      providesTags: () => [{ type: "Locations" as const, id: "towns" }],
    }),

    // GET towns by county parent ID
    getTownsByCounty: builder.query<
      ActiveLocationsResponse,
      { countyId: string; page?: number; limit?: number }
    >({
      query: (args) => {
        const params = new URLSearchParams();
        params.append("parentId", args.countyId);
        params.append("page", String(args?.page || 1));
        params.append("limit", String(args?.limit || 200));

        return {
          url: `/locations/active?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ActiveLocationsResponse) => response,
      providesTags: () => [{ type: "Locations" as const, id: "towns" }],
    }),

    // GET a single location by ID
    getLocationById: builder.query<
      { success: boolean; data: LocationItem },
      string
    >({
      query: (locationId) => ({
        url: `/locations/${locationId}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Locations" as const, id: "location" }],
    }),

    // GET dynamic service-location page data
    getServiceLocationData: builder.query<
      ServiceLocationDataResponse,
      { service: string; location: string }
    >({
      query: (args) => ({
        url: `/service-locations/dynamic/${args.service}/${args.location}`,
        method: "GET",
      }),
      transformResponse: (response: ServiceLocationDataResponse) => response,
      providesTags: (result, error, arg) => [
        {
          type: "Locations" as const,
          id: `service-location-${arg.service}-${arg.location}`,
        },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveLocationsQuery,
  useGetRegionsQuery,
  useGetCountiesByRegionQuery,
  useGetCitiesByCountyQuery,
  useGetTownsByCityQuery,
  useGetTownsByCountyQuery,
  useGetLocationByIdQuery,
  useGetServiceLocationDataQuery,
} = locationSlice;

export default locationSlice;
