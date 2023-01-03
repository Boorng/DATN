import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
    name: "class",
    initialState: {
        listClass: [],
    },
    reducers: {
        resetClass: (state, action) => {
            state.listClass = [...action.payload];
        },

        addClass: (state, action) => {
            state.listClass = [...state.listClass, action.payload];
        },

        editClass: (state, action) => {
            let indexEdit = 0;
            state.listClass.forEach((stu, index) => {
                if (stu.id === action.payload.id) indexEdit = index;
            });

            state.listClass.splice(indexEdit, 1, action.payload);
        },

        deleteClass: (state, action) => {
            state.listClass = state.listClass.filter(
                (cls) => cls.id !== action.payload
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { addClass, editClass, deleteClass, resetClass } =
    classSlice.actions;

export default classSlice.reducer;
