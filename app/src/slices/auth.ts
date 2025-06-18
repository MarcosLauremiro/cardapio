import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
	type EstablishmentRegister,
	type AuthResponse,
	type Login,
} from "../types/establishment";
import { apiSlice } from "./api";
import type { RootState } from "../store/store";

interface AuthState {
	token: string | null;
	Establishment: AuthResponse | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<AuthResponse, Login>({
			query: (credentials) => ({
				url: "/auth/login",
				method: "POST",
				body: credentials,
			}),
			invalidatesTags: ["Auth"],
		}),
		register: build.mutation<AuthResponse, EstablishmentRegister>({
			query: (data) => ({
				url: "/auth/register",
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

// Estado inicial limpo, sem localStorage
const initialState: AuthState = {
	token: null,
	Establishment: null,
	isAuthenticated: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<AuthResponse>) => {
			const token = action.payload.response.token;
			state.token = token;
			state.Establishment = action.payload;
			state.isAuthenticated = true;

			localStorage.setItem("@userToken", token);
		},
		logout: (state) => {
			state.token = null;
			state.Establishment = null;
			state.isAuthenticated = false;

			localStorage.removeItem("@userToken");
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export default authSlice.reducer;

// Selectors
export const setListUser = (state: RootState) => state.auth.Establishment;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const { logout, setCredentials, setLoading } = authSlice.actions;

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
	authApiSlice;
