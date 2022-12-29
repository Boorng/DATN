import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: "student",
    initialState: {
        listStudent: [],
    },
    reducers: {
        resetStudent: (state, action) => {
            state.listStudent = [...action.payload];
        },

        addStudent: (state, action) => {
            state.listStudent = [...state.listStudent, action.payload];
        },

        addListStudent: (state, action) => {
            state.listStudent = [...state.listStudent, ...action.payload];
        },

        editStudent: (state, action) => {
            let indexEdit = 0;
            state.listStudent.forEach((stu, index) => {
                if (stu.id === action.payload.id) indexEdit = index;
            });

            state.listStudent.splice(indexEdit, 1, action.payload);
        },

        updateStatusStudent: (state, action) => {
            let indexEdit = 0;
            state.listStudent.forEach((stu, index) => {
                if (stu.id === action.payload) indexEdit = index;
            });

            state.listStudent[indexEdit].status = 2;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addStudent,
    addListStudent,
    editStudent,
    updateStatusStudent,
    resetStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
