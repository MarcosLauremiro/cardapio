import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_REACT_API_URL;

export const apiSlice = createApi({
	reducerPath: "api",
	tagTypes: ["Categories", "Products", "Auth", "User"],
	endpoints: () => ({}),
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("@userToken");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
});
