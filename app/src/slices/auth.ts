import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
	type EstablishmentRegister,
	type AuthResponse,
	type Login,
} from "../types/User";
import { apiSlice } from "./api";
import type { RootState } from "../store/store";

interface AuthState {
	token: string | null;
	user: AuthResponse | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<AuthResponse, Login>({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),
			invalidatesTags: ["Auth"],
		}),
		register: build.mutation<AuthResponse, EstablishmentRegister>({
			query: (data) => ({
				url: "/register",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Auth"],
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			invalidatesTags: ["Auth"],
		}),
	}),
});

const initialState: AuthState = {
	token: null,
	user: null,
	isAuthenticated: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<AuthResponse>) => {
			const token = action.payload.token;
			state.token = token;
			state.user = action.payload;
			state.isAuthenticated = true;

			localStorage.setItem("@userToken", token);
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;

			localStorage.removeItem("@userToken");
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export default authSlice.reducer;

export const setListUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const { logout, setCredentials, setLoading } = authSlice.actions;

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
	authApiSlice;
