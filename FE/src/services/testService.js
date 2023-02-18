import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Test-- */
export const getStudentResult = (divisionId, grade, semesterId) => {
    return instance.get(
        `${END_POINT.Test}/student-result/${divisionId}/${grade}/${semesterId}`
    );
};

export const getStatisticAPI = (academicYear, grade, classId) => {
    return instance.get(
        `${END_POINT.Test}/statistic/${academicYear}/${grade}`,
        {
            params: {
                classId,
            },
        }
    );
};

export const getSummaryResultAPI = (divisionId, grade, academicYear) => {
    return instance.get(
        `${END_POINT.Test}/summary/${divisionId}/${grade}/${academicYear}`
    );
};

export const getListTestClassAPI = (classId, subjectId, semesterId) => {
    return instance.get(
        `${END_POINT.Test}/class/${classId}/${subjectId}/${semesterId}`
    );
};

export const checkAddMarkAPI = (classId, semesterId, subjectId) => {
    return instance.get(`${END_POINT.Test}/check-add-mark`, {
        params: {
            classId,
            semesterId,
            subjectId,
        },
    });
};

export const addTestAPI = (test) => {
    return instance.post(`${END_POINT.Test}`, test);
};

export const addListTestAPI = (tests) => {
    return instance.post(`${END_POINT.Test}/add-list`, tests);
};

export const updateTestAPI = (test) => {
    return instance.put(`${END_POINT.Test}`, test);
};

export const deleteTestAPI = (id) => {
    return instance.delete(`${END_POINT.Test}/${id}`);
};

export const deleteListTestAPI = (divisionId, semesterId, subjectId) => {
    return instance.delete(`${END_POINT.Test}/delete`, {
        params: {
            divisionId,
            semesterId,
            subjectId,
        },
    });
};

/* ---- */
