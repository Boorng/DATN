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

export const postListStudentAPI = (listStudent) => {
    return instance.post(`${END_POINT.Student}/add-list`, listStudent);
};

export const updateStudentAPI = (studentEdit) => {
    return instance.put(`${END_POINT.Student}`, studentEdit);
};

export const deleteStudentAPI = (id) => {
    return instance.delete(`${END_POINT.Student}/${id}`);
};
