import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Subject-- */
export const getSubjectAPI = (grade) => {
    return instance.get(`${END_POINT.Subject}/grade/${grade}`);
};

export const postSubjectAPI = (subject) => {
    return instance.post(`${END_POINT.Subject}`, subject);
};

export const updateSubjectAPI = (subjectEdit) => {
    return instance.put(`${END_POINT.Subject}`, subjectEdit);
};

export const deleteSubjectAPI = (id) => {
    return instance.delete(`${END_POINT.Subject}/${id}`);
};

export const checkDataSubjectAPI = (id) => {
    return instance.get(`${END_POINT.Subject}/check-data/${id}`);
};
/* ---- */
