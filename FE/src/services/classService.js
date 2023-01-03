import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Class-- */
export const getClassAPI = (grade, search) => {
    return instance.get(`${END_POINT.Class}`, {
        params: {
            grade,
            search,
        },
    });
};

export const postClassAPI = (classs) => {
    return instance.post(`${END_POINT.Class}`, classs);
};

export const updateClassAPI = (classEdit) => {
    return instance.put(`${END_POINT.Class}`, classEdit);
};

export const deleteClassAPI = (id) => {
    return instance.delete(`${END_POINT.Class}/${id}`);
};
/* ---- */
