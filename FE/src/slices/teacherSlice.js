import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
    name: "teacher",
    initialState: {
        listTeacher: [],
    },
    reducers: {
        resetTeacher: (state, action) => {
            state.listTeacher = [...action.payload];
        },

        addTeacher: (state, action) => {
            state.listTeacher = [...state.listTeacher, action.payload];
        },

        addListTeacher: (state, action) => {
            state.listTeacher = [...state.listTeacher, ...action.payload];
        },

        editTeacher: (state, action) => {
            let indexEdit = 0;
            state.listTeacher.forEach((tc, index) => {
                if (tc.id === action.payload.id) indexEdit = index;
            });

            state.listTeacher.splice(indexEdit, 1, action.payload);
        },

        updateStatusTeacher: (state, action) => {
            let indexEdit = 0;
            state.listTeacher.forEach((tc, index) => {
                if (tc.id === action.payload) indexEdit = index;
            });

            state.listTeacher[indexEdit].status = 2;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addTeacher,
    editTeacher,
    updateStatusTeacher,
    addListTeacher,
    resetTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;
