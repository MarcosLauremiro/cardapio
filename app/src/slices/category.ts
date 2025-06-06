import type { RootState } from "../store/store";
import type { Category } from "../types/category.type";
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const endPointUrl: string = "/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getCategories: query<Category[], void>({
			query: () => endPointUrl,
			providesTags: ["Categories"],
		}),
		deleteCategory: mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: `${endPointUrl}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Categories"],
		}),
		createCategory: mutation<Category, Partial<Category>>({
			query: (newCategory) => ({
				url: endPointUrl,
				method: "POST",
				body: newCategory,
			}),
			invalidatesTags: ["Categories"],
		}),
		updateCategory: mutation<Category, { id: string; data: Partial<Category> }>(
			{
				query: ({ id, data }) => ({
					url: `${endPointUrl}/${id}`,
					method: "PUT",
					body: data,
				}),
				invalidatesTags: ["Categories"],
			}
		),
	}),
});

//results resposta de toda a requsiçao

const category: Category = {
	_id: "37q89e98rq07ert8q74878q",
	name: "Pizza",
	icon: "🍕",
	isActive: true,
};

const categories = [
	category,
	{ ...category, id: "68405248395t2-4tyu8", name: "saladas", icon: "🥗" },
	{ ...category, id: "68405248312452wedf1", name: "Sobremesas", icon: "🍦" },
	{ ...category, id: "6840524832454256rf1t4", name: "Bebidas", icon: "🍹" },
];

export const initialState = categories;

const categoriesSlice = createSlice({
	name: "categories",
	initialState: initialState,
	reducers: {
		createCategory(state, action) {
			const newCategory = {
				...action.payload,
				id: Math.random().toString(36).substring(2, 15), // Simple ID generation
			};
			state.push(newCategory);
		},
		updateCategory(state, action) {
			const index = state.findIndex(
				(category) => category._id === action.payload.id
			);
			state[index] = action.payload;
		},
		deleteCategory(state, action) {
			const index = state.findIndex(
				(category) => category._id === action.payload.id
			);
			state.slice(index, 1);
		},
	},
});

//selectors

export const selectCategories = (state: RootState) => state.categories;

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
