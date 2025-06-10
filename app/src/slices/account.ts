import { createSlice } from "@reduxjs/toolkit";

const initialState = {};



const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		createAccount() {},
		updateAccount() {},
		deleteAccount() {},
	},
});

export default accountSlice.reducer;
export const { createAccount, deleteAccount, updateAccount } =
	accountSlice.actions;
