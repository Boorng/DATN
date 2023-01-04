import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Teacher-- */
export const getTeacherAPI = (search) => {
    return instance.get(`${END_POINT.Teacher}`, {
        params: {
            search,
        },
    });
};

export const getTeacherNoLeaveAPI = () => {
    return instance.get(`${END_POINT.Teacher}/no-leave`);
};

export const postTeacherAPI = (teacher) => {
    return instance.post(`${END_POINT.Teacher}`, teacher);
};

export const postListTeacherAPI = (listTeacher) => {
    return instance.post(`${END_POINT.Teacher}/add-list`, listTeacher);
};

export const updateTeacherAPI = (teacherEdit) => {
    return instance.put(`${END_POINT.Teacher}`, teacherEdit);
};

export const updateStatusTeacherAPI = (id, status = 2) => {
    return instance.put(`${END_POINT.Teacher}/${id}`, status);
};
/* ---- */
