import {
	configureStore,
	type Action,
	type ThunkAction,
} from "@reduxjs/toolkit";
import categoriesReducer from "../slices/category";
import { apiSlice } from "../slices/api";

export const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RTCIceConnectionState,
	unknown,
	Action<string>
>;
