export const publicRoutes = {
    home: "/",
};

export const manageRoutes = {
    information: "/manage/information",
    manageStudent: "/manage/student",
    manageTeacher: "/manage/teacher",
    manageTeam: "manage/team",
    manageTeacherTeam: "/teacher-team/:teamName/:teamId",
    manageClass: "/manage/class/grade/:gradeName",
    listStudentClass: "/class/:className/academicYear/:academicYear/:classId",
    manageSemester: "/manage/semester",
    manageResult: "/manage/result/grade/:gradeName",
    manageResultStudent: "/student/:studentName/:divisionId",
    editResultStudent: "/edit-student/:studentName/:divisionId",
    semester: "/semester/:semesterName/:semesterId",
    fullYear: "/fullYear",
    manageTrainingResult: "/manage/conduct/grade/:gradeName",
    manageConductStudent: "/student/:studentName/:studentId/:divisionId",
    manageTrainingManagement: "/manage/training-management/grade/:gradeName",
    manageSubject: "/subject/:subjectName/:subjectId",
    chatApp: "/manage/chat-app",
};

export const teacherRoutes = {
    information: "/teacher/information",
    changePassword: "/teacher/changePassword",
    teacherTeam: "/teacher/team",
    homeroom: "/teacher/homeroom-class",
    class: "/:classId/:className/grade/:gradeName/academicYear/:academicYear",
    result: "/result",
    conduct: "/conduct",
    resultStudent: "/student/:studentName/:divisionId/:teacherName",
    semester: "/semester/:semesterName/:semesterId",
    fullYear: "/fullYear",
    subject: "/teacher/subject-class",
    subjectClass:
        "/result/class/:className/:classId/subject/:subjectName/:subjectId/semester/:semesterName/:semesterId",
    conductStudent: "/student/:studentName/:studentId/:divisionId/:teacherName",
    editConductStudent:
        "/edit-student/:studentName/:studentId/:divisionId/:teacherName",
    chatApp: "/teacher/chat-app",
};

export const studentRoutes = {
    information: "/student/information",
    result: "/student/result/grade/:gradeName/class/:className/academicYear/:academicYear/:classId/:studentName/:divisionId",
    semester: "/semester/:semesterName/:semesterId",
    fullYear: "/fullYear",
    conduct:
        "/student/conduct/grade/:gradeName/class/:className/academicYear/:academicYear/:classId/:studentName/:studentId/:divisionId",
    changePassword: "/student/changePassword",
    chat: "/student/chat-app",
};
