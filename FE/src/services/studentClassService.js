import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Class-- */
export const getStudentClassAPI = (classId, search) => {
    return instance.get(`${END_POINT.StudentClass}/${classId}`, {
        params: {
            search,
        },
    });
};

export const postListStudentClassAPI = (classs) => {
    return instance.post(`${END_POINT.Class}`, classs);
};

export const updateStudentClassAPI = (classEdit) => {
    return instance.put(`${END_POINT.Class}`, classEdit);
};

/* ---- */
