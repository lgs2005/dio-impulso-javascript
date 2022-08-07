import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

type UserSliceState = {
	user: User | null,
	token: string | null,
}

const initialState: UserSliceState = {
	user: null,
	token: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<{user: User, token: string}>) => {
			state.user = action.payload.user
			state.token = action.payload.token

			window.localStorage.setItem('post-app:jwt', state.token);
		}
	}
})

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;