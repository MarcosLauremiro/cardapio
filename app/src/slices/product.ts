import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product.type";
import { apiSlice } from "./api";
import type { RootState } from "../store/store";

const endPointUrl: string = "/products";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getProducts: query<Product[], void>({
			query: () => endPointUrl,
		}),
		createProduct: mutation<Product, FormData>({
			query: (newProduct) => ({
				url: `${endPointUrl}`,
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: ["Products"],
		}),
		deleteProduct: mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: `${endPointUrl}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
		updateProduct: mutation<Product, { id: string; data: FormData }>({
			query: ({ id, data }) => ({
				url: `${endPointUrl}/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Products"],
		}),
	}),
});

const initialState: Product[] = [];

const productsSlice = createSlice({
	name: "products",
	initialState: initialState,
	reducers: {
		createProduct(state, action) {
			const newProduct = {
				...action.payload,
				id: Math.random().toString(36).substring(2, 15),
			};

			state.push(newProduct);
		},
		updateProduct(state, action) {
			const index = state.findIndex(
				(product) => product._id === action.payload.id
			);

			state[index] = action.payload;
		},
		deleteProduct(state, action) {
			const index = state.findIndex(
				(category) => category._id === action.payload.id
			);
			state.slice(index, 1);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			productsApiSlice.endpoints.getProducts.matchFulfilled,
			(state, { payload }: PayloadAction<Product[]>) => {
				return payload;
			}
		);
	},
});

export const listProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
export const { createProduct, updateProduct, deleteProduct } =
	productsSlice.actions;

export const {
	useDeleteProductMutation,
	useGetProductsQuery,
	useUpdateProductMutation,
	useCreateProductMutation,
} = productsApiSlice;
