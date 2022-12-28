import { configureStore } from "@reduxjs/toolkit";
import classSlice from "../slices/classSlice";
import loginSlice from "../slices/loginSlice";
import studentSlice from "../slices/studentSlice";
import teacherSlice from "../slices/teacherSlice";

export default configureStore({
    reducer: {
        login: loginSlice,
        student: studentSlice,
        teacher: teacherSlice,
        class: classSlice,
    },
});
