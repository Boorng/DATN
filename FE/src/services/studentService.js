import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Student-- */
export const getStudentAPI = (search) => {
    return instance.get(`${END_POINT.Student}`, {
        params: {
            search,
        },
    });
};

export const postStudentAPI = (student) => {
    return instance.post(`${END_POINT.Student}`, student);
};

export const postListStudentAPI = (listStudent) => {
    return instance.post(`${END_POINT.Student}/add-list`, listStudent);
};

export const updateStudentAPI = (studentEdit) => {
    return instance.put(`${END_POINT.Student}`, studentEdit);
};

export const updateStatusStudentAPI = (id, status = 2) => {
    return instance.put(`${END_POINT.Student}/${id}`, status);
};
/* ---- */
