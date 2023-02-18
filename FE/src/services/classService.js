import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Class-- */
export const getClassAPI = (grade = "", search = "") => {
    return instance.get(`${END_POINT.Class}`, {
        params: {
            grade,
            search,
        },
    });
};

export const checkYearAPI = (academicYear) => {
    return instance.get(`${END_POINT.Class}/check-year/${academicYear}`);
};

export const getClassByHeaderTeacher = (headerTeacherId, academicYear = "") => {
    return instance.get(
        `${END_POINT.Class}/header-teacher/${headerTeacherId}`,
        { params: { academicYear } }
    );
};

export const getTeacherByClassId = (classId) => {
    return instance.get(`${END_POINT.Class}/teacher-info/${classId}`);
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

export const checkDataClassAPI = (id) => {
    return instance.get(`${END_POINT.Class}/check-data/${id}`);
};
/* ---- */
