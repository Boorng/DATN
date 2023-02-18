import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Assign-- */
export const getAssignAPI = (grade, subjectId, semesterId, search) => {
    return instance.get(`${END_POINT.Assign}/${grade}/${subjectId}`, {
        params: {
            semesterId,
            search,
        },
    });
};

export const getByTeacherIdAPI = (teacherId, semesterId) => {
    return instance.get(`${END_POINT.Assign}/teacher/${teacherId}`, {
        params: {
            semesterId,
        },
    });
};

export const postListAssignAPI = (assignList) => {
    return instance.post(`${END_POINT.Assign}/add-list`, assignList);
};

export const updateAssignAPI = (assignUpdate) => {
    return instance.put(`${END_POINT.Assign}`, assignUpdate);
};

export const updateAssignTeacherAPI = (idAssign, idClass) => {
    return instance.put(`${END_POINT.Assign}/${idAssign}/${idClass}`);
};

export const deleteAssignAPI = (id) => {
    return instance.delete(`${END_POINT.Assign}/${id}`);
};

export const deleteListAssignAPI = (
    teacherId,
    classId,
    subjectId,
    semesterId
) => {
    return instance.delete(`${END_POINT.Assign}/delete`, {
        params: {
            teacherId,
            classId,
            subjectId,
            semesterId,
        },
    });
};

/* ---- */
