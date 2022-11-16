import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
    name: "class",
    initialState: {
        class: {},
        listClass: [],
    },
    reducers: {
        addClass: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.class[item[0]] = action.payload[item[0]];
            });
            state.listClass = [...state.listClass, state.class];
        },

        editClass: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.class[item[0]] = action.payload[item[0]];
            });

            let indexEdit = 0;
            state.listClass.forEach((stu, index) => {
                if (stu.id === state.class.id) indexEdit = index;
            });

            state.listClass.splice(indexEdit, 1, state.class);
        },

        deleteClass: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.class[item[0]] = action.payload[item[0]];
            });
            state.listClass = state.listClass.filter(
                (stu) => stu.id !== action.payload.id
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { addClass, editClass, deleteClass } = classSlice.actions;

export default classSlice.reducer;
