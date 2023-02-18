import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Student-- */
export const getStudentAPI = (schoolYear = "", search = "") => {
    return instance.get(`${END_POINT.Student}`, {
        params: {
            schoolYear,
            search,
        },
    });
};

export const getStudentByAccount = (accountId) => {
    return instance.get(`${END_POINT.Student}/account/${accountId}`);
};

export const getStudentById = (id) => {
    return instance.get(`${END_POINT.Student}/${id}`);
};

export const postStudentAPI = (student) => {
    return instance.post(`${END_POINT.Student}`, student);
};

export const postListStudentAPI = (listStudent) => {
    return instance.post(`${END_POINT.Student}/add-list`, listStudent);
};

export const uploadImageAPI = (id, formData) => {
    return instance.post(`${END_POINT.Student}/upload-image/${id}`, formData);
};

export const updateStudentAPI = (studentEdit) => {
    return instance.put(`${END_POINT.Student}`, studentEdit);
};

export const deleteStudentAPI = (id) => {
    return instance.delete(`${END_POINT.Student}/${id}`);
};

export const checkDataStudentAPI = (id) => {
    return instance.get(`${END_POINT.Student}/check-data/${id}`);
};

/* ---- */
