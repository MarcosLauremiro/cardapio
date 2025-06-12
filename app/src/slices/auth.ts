import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
	type EstablishmentRegister,
	type AuthResponse,
	type Login,
} from "../types/establishment";
import { apiSlice } from "./api";

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

const loadTokenFromStorage = (): string | null => {
	try {
		return localStorage.getItem("authToken");
	} catch {
		return null;
	}
};

const loadUserFromStorage = (): AuthResponse | null => {
	try {
		const user = localStorage.getItem("authUser");
		return user ? JSON.parse(user) : null;
	} catch {
		return null;
	}
};

const initialState: AuthState = {
	token: loadTokenFromStorage(),
	Establishment: loadUserFromStorage(),
	isAuthenticated: !!loadTokenFromStorage(),
	isLoading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<AuthResponse>) => {
			const { token } = action.payload;
			state.token = token;
			state.Establishment = action.payload;
			state.isAuthenticated = true;

			localStorage.setItem("authToken", token);
			localStorage.setItem("authUser", JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.token = null;
			state.Establishment = null;
			state.isAuthenticated = false;

			// Remover do localStorage
			localStorage.removeItem("authToken");
			localStorage.removeItem("authUser");
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export default authSlice.reducer;
export const { logout, setCredentials, setLoading } = authSlice.actions;

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
	authApiSlice;
