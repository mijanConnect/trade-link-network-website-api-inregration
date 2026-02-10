import { baseApi } from "../baseApi";

export interface GetMyLeadsArgs {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sort?: string;
    order?: string;
}

export interface AnsweredQuestion {
    questionText: string;
    answerText: string;
    _id: string;
}

export interface Service {
    _id: string;
    name: string;
}

export interface JobPost {
    _id: string;
    service: Service;
    answeredQuestions: AnsweredQuestion[];
}

export interface Creator {
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

export interface MyLeadResponse {
    _id: string;
    jobPost: JobPost;
    sender: string;
    receiver: string;
    creator?: Creator;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface MyLeadsApiResponse {
    success: boolean;
    message: string;
    pagination: {
        total: number;
        limit: number;
        page: number;
        totalPage: number;
    };
    data: MyLeadResponse[];
}

const myLeadSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyLeads: builder.query<MyLeadsApiResponse, GetMyLeadsArgs | void>({
            query: (args) => {
                const params = new URLSearchParams();
                const queryArgs = args || {};
                if (queryArgs.page) params.set('page', queryArgs.page.toString());
                if (queryArgs.limit) params.set('limit', queryArgs.limit.toString());
                if (queryArgs.status) params.set('status', queryArgs.status);
                if (queryArgs.search) params.set('search', queryArgs.search);
                if (queryArgs.sort) params.set('sort', queryArgs.sort);
                if (queryArgs.order) params.set('order', queryArgs.order);
                const queryString = params.toString();
                return {
                    url: `/jobRequests${queryString ? `?${queryString}` : ''}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: MyLeadsApiResponse) => response,
        }),

        getMyLeadDetails: builder.query<MyLeadResponse, string>({
            query: (id) => {
                return {
                    url: `/jobRequests/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: MyLeadResponse | { data: MyLeadResponse }) => {
                // Handle both response formats: direct object or wrapped in data
                return (response as { data: MyLeadResponse }).data || (response as MyLeadResponse);
            },
        }),
    }),
})
export const { useGetMyLeadsQuery, useGetMyLeadDetailsQuery } = myLeadSlice;