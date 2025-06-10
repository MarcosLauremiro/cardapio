import type { RootState } from "../store/store";
import type { Category } from "../types/category.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const endPointUrl: string = "/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query<Category[], void>({
			query: () => endPointUrl,
			providesTags: ["Categories"],
		}),
		deleteCategory: build.mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: `${endPointUrl}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Categories"],
		}),
		createCategory: build.mutation<Category, Partial<Category>>({
			query: (newCategory) => ({
				url: endPointUrl,
				method: "POST",
				body: newCategory,
			}),
			invalidatesTags: ["Categories"],
		}),
		updateCategory: build.mutation<
			Category,
			{ id: string; data: Partial<Category> }
		>({
			query: ({ id, data }) => ({
				url: `${endPointUrl}/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Categories"],
		}),
	}),
});

export const initialState: Category[] = [];

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		createCategory(state, action) {
			const newCategory = action.payload;
			state.push(newCategory);
		},
		updateCategory(state, action) {
			const index = state.findIndex(
				(category) => category._id === action.payload.id
			);
			if (index !== -1) {
				state[index] = { ...state[index], ...action.payload.data };
			}
		},
		deleteCategory(state, action) {
			const index = state.findIndex(
				(category) => category._id === action.payload.id
			);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			categoriesApiSlice.endpoints.getCategories.matchFulfilled,
			(state, { payload }: PayloadAction<Category[]>) => {
				return payload;
			}
		);
	},
});

//selectors

export const listCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) =>
	state.categories.find((category) => category._id === id);

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
	categoriesSlice.actions;

export const {
	useGetCategoriesQuery,
	useDeleteCategoryMutation,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} = categoriesApiSlice;
