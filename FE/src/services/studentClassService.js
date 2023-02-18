import instance from "../utils/instance";
import END_POINT from "./constant";

/* --StudentClass-- */
export const getStudentClassAPI = (classId, search) => {
    return instance.get(`${END_POINT.StudentClass}/${classId}`, {
        params: {
            search,
        },
    });
};

export const getClassByStudentAPI = (studentId) => {
    return instance.get(`${END_POINT.StudentClass}/student/${studentId}`);
};

export const postListStudentClassAPI = (classList) => {
    return instance.post(`${END_POINT.StudentClass}/add-list`, classList);
};

export const updateStudentClassAPI = (idUpdate, classIdChange) => {
    return instance.put(
        `${END_POINT.StudentClass}/${idUpdate}/${classIdChange}`
    );
};

export const deleteStudentClassAPI = (id) => {
    return instance.delete(`${END_POINT.StudentClass}/${id}`);
};

export const deleteListStudentClassAPI = (studentId, classId) => {
    return instance.delete(`${END_POINT.StudentClass}/student-class`, {
        params: {
            studentId,
            classId,
        },
    });
};

/* ---- */
