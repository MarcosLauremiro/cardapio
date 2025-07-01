import {
	type Address,
	type InfoAccount,
	type Schedule,
	type User,
} from "../types/User";
import { apiSlice } from "./api";

const endPointUrl = "/users";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getUser: query<User, void>({
			query: () => endPointUrl,
			providesTags: ["User"],
		}),
		setSchedule: mutation<Schedule, Schedule[]>({
			query: (schedule) => ({
				url: `${endPointUrl}/schedule`,
				method: "PUT",
				body: { schedule },
			}),
			invalidatesTags: ["User"],
		}),
		updateAddress: mutation<User, Address>({
			query: (data) => ({
				url: `${endPointUrl}/address`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateBusinessInfo: mutation<User, InfoAccount>({
			query: (data) => ({
				url: `${endPointUrl}/account`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateMedia: mutation<User, FormData>({
			query: (data) => ({
				url: `${endPointUrl}/image`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
		updateWaiter: mutation<
			User,
			[
				{
					name: string;
				}
			]
		>({
			query: (data) => ({
				url: `${endPointUrl}/waiter`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useSetScheduleMutation,
	useUpdateAddressMutation,
	useUpdateBusinessInfoMutation,
	useUpdateMediaMutation,
} = userApiSlice;
