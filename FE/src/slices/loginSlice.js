import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        idUser: 0,
        type: "",
    },
    reducers: {
        login: (state, action) => {
            state.idUser = action.payload.idUser;
            state.type = action.payload.type;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login } = loginSlice.actions;

export default loginSlice.reducer;
