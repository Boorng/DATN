import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Subject-- */
export const getSemesterAPI = (academicYear) => {
    return instance.get(`${END_POINT.Semester}`, {
        params: {
            academicYear,
        },
    });
};

export const getAcademicYearAPI = (semesterId) => {
    return instance.get(`${END_POINT.Semester}/academicYear/${semesterId}`);
};

export const postSemesterAPI = (semester) => {
    return instance.post(`${END_POINT.Semester}`, semester);
};

export const updateSemesterAPI = (semesterEdit) => {
    return instance.put(`${END_POINT.Semester}`, semesterEdit);
};

export const deleteSemesterAPI = (id) => {
    return instance.delete(`${END_POINT.Semester}/${id}`);
};

export const checkDataSemesterAPI = (id) => {
    return instance.get(`${END_POINT.Semester}/check-data/${id}`);
};
/* ---- */
