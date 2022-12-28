import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: "student",
    initialState: {
        student: {},
        listStudent: [],
    },
    reducers: {
        addStudent: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.student[item[0]] = action.payload[item[0]];
            });
            state.listStudent = [...state.listStudent, state.student];
        },

        addListStudent: (state, action) => {
            state.listStudent = [...state.listStudent, ...action.payload];
        },

        editStudent: (state, action) => {
            const arr = Object.entries(action.payload);
            arr.forEach((item) => {
                state.student[item[0]] = action.payload[item[0]];
            });

            let indexEdit = 0;
            state.listStudent.forEach((stu, index) => {
                if (stu.id === state.student.id) indexEdit = index;
            });

            state.listStudent.splice(indexEdit, 1, state.student);
        },

        deleteStudent: (state, action) => {
            console.log(action.payload);
            state.listStudent = state.listStudent.filter(
                (stu) => stu.id !== action.payload
            );
        },

        getStudent: (state, action) => {
            const studentGet = state.listStudent.find(
                (stu) => action.payload.id === stu.id
            );
            const arr = Object.entries(studentGet);
            arr.forEach((item) => {
                state.student[item[0]] = studentGet[item[0]];
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addStudent,
    addListStudent,
    editStudent,
    deleteStudent,
    getStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
