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

export const getStudentAPI = (search, academicYear) => {
    return instance.get(`${END_POINT.Student}`, {
        params: {
            academicYear,
            search,
        },
    });
};

/* --Student-- */
export const postStudentAPI = (student) => {
    return instance.post(`${END_POINT.Student}`, student);
};

export const postListStudentAPI = (listStudent) => {
    return instance.post(`${END_POINT.Student}/add-list`, listStudent);
};

export const updateStudentAPI = (studentEdit) => {
    return instance.put(`${END_POINT.Student}`, studentEdit);
};

export const updateStatusStudentAPI = (id, status = 2) => {
    return instance.put(`${END_POINT.Student}/${id}`, status);
};
/* ---- */

/* --Teacher-- */
export const postTeacherAPI = (teacher) => {
    return instance.post(`${END_POINT.Teacher}`, teacher);
};

export const postListTeacherAPI = (listTeacher) => {
    return instance.post(`${END_POINT.Teacher}/add-list`, listTeacher);
};

export const updateTeacherAPI = (teacherEdit) => {
    return instance.put(`${END_POINT.Teacher}`, teacherEdit);
};

export const updateStatusTeacherAPI = (id, status = 2) => {
    return instance.put(`${END_POINT.Teacher}/${id}`, status);
};
/* ---- */
