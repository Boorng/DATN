import instance from "../utils/instance";

const END_POINT = {
    Student: "student",
};

export const getStudentAPI = () => {
    return instance.get(`${END_POINT.Student}`);
};

export const postStudentAPI = (student) => {
    return instance.post(`${END_POINT.Student}`, student);
};
