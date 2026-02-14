import { baseApi } from "../baseApi";

// Type definitions for API responses
export interface LeadCreator {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  isPhoneVerified: boolean;
  customer?: {
    _id: string;
    profileImage?: string;
    address?: string;
    user?: string;
    updatedAt?: string;
    jobPostCount?: number;
    completedJobPostCount?: number;
    leadPurchasedCount?: number;
  };
}

export interface LeadService {
  _id: string;
  name: string;
}

export interface AnsweredQuestion {
  questionText: string;
  answerText: string;
  _id: string;
}

export interface Lead {
  _id: string;
  creator: LeadCreator;
  category: string;
  service: LeadService;
  leadPrice: number;
  postcode: string;
  locationName: string;
  country: string;
  region: string;
  area: string;
  status: string;
  purchasedCount: number;
  purchasedBy: unknown[];
  hiredProfessional: unknown | null;
  answeredQuestions: AnsweredQuestion[];
  description: string;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
  jobNumber: string;
  isFrequent: boolean;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface GetAllLeadsResponse {
  success: boolean;
  message: string;
  pagination: Pagination;
  data: Lead[];
}

export interface GetSingleLeadResponse {
  success: boolean;
  message: string;
  data: Lead;
}

export interface LeadPurchaseResponse {
  success: boolean;
  message: string;
  data: {
    checkOutUrl: string;
  };
}

const leadSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLeads: builder.query<
          { data: Lead[]; pagination: Pagination},
          void
        >({
            query: () => {
                return {
                    url: '/jobPosts',
                    method: 'GET',
                };
            },
            transformResponse: (response: GetAllLeadsResponse) => ({
                data: response?.data ?? [],
                pagination: response?.pagination ?? {
                    total: 0,
                    limit: 10,
                    page: 1,
                    totalPage: 0,
                },
            }),
            providesTags: ['Leads'],
        }),

        getSingleLead: builder.query<Lead, string>({
            query: (id) => {
                return {
                    url: `/jobPosts/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: GetSingleLeadResponse) => response?.data,
            providesTags: ['Leads'],
        }),

        leadPurchase: builder.mutation<{ checkOutUrl: string }, string>({
            query: (id) => {
                return {
                    url: `/jobPosts/${id}/purchase`,
                    method: 'POST',
                };
            },
            transformResponse: (response: LeadPurchaseResponse) => ({
                checkOutUrl: response?.data?.checkOutUrl ?? '',
            }),
            invalidatesTags: ['Leads'],
        }),
    }),
})  

export const { useGetAllLeadsQuery, useLeadPurchaseMutation, useGetSingleLeadQuery } = leadSlice;