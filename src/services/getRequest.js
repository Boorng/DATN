import instance from "../utils/instance";

const END_POINT = {
    Account: "Account",
    Assign: "Assign",
    Class: "Class",
    Conduct: "Conduct",
    Semester: "Semester",
    StudentClass: "StudentClass",
    Student: "Student",
    Subject: "Subject",
    Teacher: "Teacher",
    Team: "Team",
    Test: "Test",
};

export const getStudentAPI = (pageIndex, search) => {
    return instance.get(`${END_POINT.Student}/page/${pageIndex}`, {
        param: {
            search,
        },
    });
};

export const postStudentAPI = (student) => {
    return instance.post(`${END_POINT.Student}`, student);
};

export const updateStudentAPI = () => {};
