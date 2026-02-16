import { baseApi } from "../baseApi";

// ---------------------------------------
// Types & Enums for "My Profile" API
// ---------------------------------------
export enum ProfessionalDocumentType {
  DRIVING_LICENSE = "DRIVING_LICENSE",
  PASSPORT = "PASSPORT",
  INSURANCE = "INSURANCE",
}

export interface VerificationDocument {
  documentType: ProfessionalDocumentType;
  documentPath: string;
  uploadedAt: string;
  _id: string;
}

export interface ProfessionalLocation {
  type: string;
  coordinates: [number, number];
}

export interface ProfessionalServiceItem {
  _id: string;
  name: string;
}

export interface ProfessionalProfile {
  _id: string;
  businessName: string;
  businessImage: string;
  location: ProfessionalLocation;
  services: Array<string | ProfessionalServiceItem>;
  serviceRadiusKm: number;
  address: string;
  ratingAvg: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  postCode: string;
  user: string;
  approveStatus: string;
  verificationDocuments: VerificationDocument[];
  about?: string;
}

export interface MyProfileUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  isVerified: boolean;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isDeleted: boolean;
  authProviders: unknown[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  professional?: ProfessionalProfile;
}

export interface MyProfileResponse {
  success: boolean;
  message: string;
  data: MyProfileUser;
}

export interface UpdateMyProfilePayload {
  businessName?: string;
  businessImage?: string;
  serviceRadiusKm?: string | number;
  documentType?: ProfessionalDocumentType;
  address?: string;
  postCode?: string;
  services?: string[];
  phone?: string;
  email?: string;
  website?: string;
  about?: string;
  // Local-only field for uploading a new business image
  businessImageFile?: File;
  // Local-only field for uploading verification document
  verificationDocumentFile?: File;
}

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
    // GET my profile
    getMyProfile: builder.query<MyProfileResponse, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      transformResponse: (response: MyProfileResponse) => response,
    }),

    // UPDATE my profile (supports JSON or FormData with image)
    updateMyProfile: builder.mutation<MyProfileResponse, UpdateMyProfilePayload>({
      query: (data) => {
        const formData = new FormData();

        if (data.businessName) formData.append("businessName", data.businessName);
        if (data.serviceRadiusKm !== undefined && data.serviceRadiusKm !== null) {
          formData.append("serviceRadiusKm", String(data.serviceRadiusKm));
        }
        if (data.address) formData.append("address", data.address);
        if (data.postCode) formData.append("postcode", data.postCode);
        if (data.phone) formData.append("phone", data.phone);
        if (data.email) formData.append("email", data.email);
        if (data.website) formData.append("website", data.website);
        if (data.about) formData.append("about", data.about);
        if (data.documentType) {
          formData.append("documentType", data.documentType);
        }
        if (Array.isArray(data.services)) {
          data.services.forEach((s) => formData.append("services", s));
        }
        if (data.businessImageFile) {
          formData.append("businessImage", data.businessImageFile);
        }
        if (data.verificationDocumentFile) {
          formData.append("doc", data.verificationDocumentFile);
        }

        return {
          url: "/professionals/me",
          method: "PATCH",
          body: formData,
        };
      },
      transformResponse: (response: MyProfileResponse) => response,
    }),

    // GET my reviews
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

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useMyReviewsQuery,
} = myProfileSlice;