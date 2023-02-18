import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Conduct-- */
export const getAllConductAPI = (semesterId, classId, grade) => {
    return instance.get(`${END_POINT.Conduct}`, {
        params: {
            semesterId,
            classId,
            grade,
        },
    });
};

export const getConductByStudentIdAPI = (studentId, semesterId) => {
    return instance.get(
        `${END_POINT.Conduct}/student/${studentId}/${semesterId}`
    );
};

export const addConductAPI = (conductModel) => {
    return instance.post(`${END_POINT.Conduct}`, conductModel);
};

export const updateConductAPI = (conduct) => {
    return instance.put(`${END_POINT.Conduct}`, conduct);
};

export const deleteListConductAPI = (studentId, semesterId) => {
    return instance.delete(`${END_POINT.Conduct}/delete`, {
        params: {
            studentId,
            semesterId,
        },
    });
};

/* ---- */
