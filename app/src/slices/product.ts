import { createSlice } from "@reduxjs/toolkit";
import type { Product, Result } from "../types/product.type";
import { apiSlice } from "./api";
import type { RootState } from "../store/store";

const endPointUrl: string = "/products";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getProducts: query<Result, { page?: number; limit?: number }>({
			query: ({ page = 1, limit = 10 } = {}) =>
				`products?page=${page}&limit=${limit}`,
			providesTags: ["Products"],
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

const product: Product = {
	ingredients: [
		{
			name: "Calabresa",
			icon: "🍖",
		},
		{
			name: "Queijo",
			icon: "🧀",
		},
		{
			name: "Molho",
			icon: "🍅",
		},
	],
	active: true,
	category: "1234",
	description: "pizza de calabresa com queijo",
	establishment: "1233556",
	imagePath: "../../assets/marguerita.png",
	name: "pizza da casa",
	price: 200,
};

const products = [
	product,
	{ ...product, id: "34567890", name: "pizza de 6 queijos" },
	{ ...product, id: "ghart4465450", name: "pizza de 6 queijos" },
	{ ...product, id: "345664647890", name: "pizza de Bacon" },
	{ ...product, id: "345546466767890", name: "pizza de strogonoff" },
];

const initialState = products;

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
