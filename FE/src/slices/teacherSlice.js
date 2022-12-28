import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
    name: "teacher",
    initialState: {
        teacher: {},
        listTeacher: [],
    },
    reducers: {
        addTeacher: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.teacher[item[0]] = action.payload[item[0]];
            });
            state.listTeacher = [...state.listTeacher, state.teacher];
        },

        addListTeacher: (state, action) => {
            state.listTeacher = [...state.listTeacher, ...action.payload];
        },

        editTeacher: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.teacher[item[0]] = action.payload[item[0]];
            });

            let indexEdit = 0;
            state.listTeacher.forEach((teach, index) => {
                if (teach.id === state.teacher.id) indexEdit = index;
            });

            state.listTeacher.splice(indexEdit, 1, state.teacher);
        },

        deleteTeacher: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.teacher[item[0]] = action.payload[item[0]];
            });
            state.listTeacher = state.listTeacher.filter(
                (teach) => teach.id !== action.payload.id
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTeacher, editTeacher, deleteTeacher, addListTeacher } =
    teacherSlice.actions;

export default teacherSlice.reducer;
