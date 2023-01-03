import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: "student",
    initialState: {
        listStudentClass: [],
    },
    reducers: {
        resetStudent: (state, action) => {
            state.listStudentClass = [...action.payload];
        },

        addStudent: (state, action) => {
            state.listStudentClass = [...state.listStudent, action.payload];
        },

        addListStudent: (state, action) => {
            state.listStudentClass = [...state.listStudent, ...action.payload];
        },

        editStudent: (state, action) => {
            let indexEdit = 0;
            state.listStudentClass.forEach((stu, index) => {
                if (stu.id === action.payload.id) indexEdit = index;
            });

            state.listStudentClass.splice(indexEdit, 1, action.payload);
        },

        updateStatusStudent: (state, action) => {
            let indexEdit = 0;
            state.listStudentClass.forEach((stu, index) => {
                if (stu.id === action.payload) indexEdit = index;
            });

            state.listStudentClass[indexEdit].status = 2;
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
