import { type Schedule, type Establishment } from "../types/User";
import { apiSlice } from "./api";

const endPointUrl = "/establishment";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getUser: query<Establishment, void>({
			query: () => endPointUrl,
			providesTags: ["User"],
		}),
		setSchedule: mutation<Schedule, { schedule: Schedule }>({
			query: ({ schedule }) => ({
				url: `${endPointUrl}/schedule`,
				method: "PUT",
				body: { schedule },
			}),
			invalidatesTags: ["User"],
		}),
		updateBasicInfo: mutation<
			Establishment,
			{
				name?: string;
				description?: string;
				category?: string;
				website?: string;
				whatsapp?: string;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/basic-info`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateAddress: mutation<
			Establishment,
			{
				street?: string;
				number?: string;
				complement?: string;
				neighborhood?: string;
				city?: string;
				state?: string;
				zipCode?: string;
				coordinates?: {
					lat: number;
					lng: number;
				};
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/address`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateBusinessInfo: mutation<
			Establishment,
			{
				cnpj?: string;
				cpf?: string;
				businessName?: string;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/business-info`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateDeliverySettings: mutation<
			Establishment,
			{
				hasDelivery?: boolean;
				deliveryFee?: number;
				minimumOrder?: number;
				deliveryRadius?: number;
				estimatedTime?: string;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/delivery-settings`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateSocialMedia: mutation<
			Establishment,
			{
				instagram?: string;
				facebook?: string;
				twitter?: string;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/social-media`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateMedia: mutation<
			Establishment,
			{
				logo?: string;
				coverImage?: string;
				photos?: string[];
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/media`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateBillingInfo: mutation<
			Establishment,
			{
				cardLastFour?: string;
				cardBrand?: string;
				holderName?: string;
				billingAddress?: string;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/billing-info`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateSubscription: mutation<
			Establishment,
			{
				planId?: string;
				planName?: string;
				status?: string;
				startDate?: Date;
				endDate?: Date;
				renewalDate?: Date;
				price?: number;
				paymentMethod?: string;
				autoRenewal?: boolean;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/subscription`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateFeatures: mutation<
			Establishment,
			{
				maxProducts?: number;
				maxPhotos?: number;
				canAcceptOnlineOrders?: boolean;
				canUseAnalytics?: boolean;
				canCustomizeTheme?: boolean;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/features`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateStatus: mutation<
			Establishment,
			{
				status?: string;
				isApproved?: boolean;
			}
		>({
			query: (data) => ({
				url: `${endPointUrl}/status`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateLastLogin: mutation<{ message: string }, void>({
			query: () => ({
				url: `${endPointUrl}/last-login`,
				method: "PUT",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useSetScheduleMutation,
	useUpdateBasicInfoMutation,
	useUpdateAddressMutation,
	useUpdateBusinessInfoMutation,
	useUpdateDeliverySettingsMutation,
	useUpdateSocialMediaMutation,
	useUpdateMediaMutation,
	useUpdateBillingInfoMutation,
	useUpdateSubscriptionMutation,
	useUpdateFeaturesMutation,
	useUpdateStatusMutation,
	useUpdateLastLoginMutation,
} = userApiSlice;
