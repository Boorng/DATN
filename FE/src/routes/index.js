import { Fragment } from "react";

// Layouts
import UpdateLayout from "../layouts/UpdateLayout";
import ManageLayout from "../layouts/ManageLayout";
import DetailLayout from "../layouts/DetailLayout";
import DetailLayoutConduct from "../layouts/DetailLayoutConduct";

import StudentLayout from "../layouts/StudentLayout";
import DetailLayoutConductStudent from "../layouts/DetailLayoutConductStudent";
import DetailLayoutStudent from "../layouts/DetailLayoutStudent";

import TeacherLayout from "../layouts/TeacherLayout";
import DetailLayoutTeacher from "../layouts/DetailLayoutTeacher";
import DetailLayoutConductTeacher from "../layouts/DetailLayoutConductTeacher";
import UpdateLayoutConductTeacher from "../layouts/UpdateLayoutConductTeacher";

// Pages
import Login from "../pages/Login";

// Config
import config from "../config";

// Component
/* --Public-- */
import NotFound from "../components/NotFound";

/* --Manage-- */
import Student from "../components/Manage/Student";
import Teacher from "../components/Manage/Teacher";
import Class from "../components/Manage/Class";
import Result from "../components/Manage/Result";
import Information from "../components/Manage/Information";
import TrainingResult from "../components/Manage/TrainingResult";
import TrainingManageMent from "../components/Manage/TrainingManagement";
import ListStudentDetail from "../components/Manage/ListStudentDetail";
import TeacherSubject from "../components/Manage/TeacherSubject";
import Team from "../components/Manage/Team";
import DetailTeam from "../components/Manage/Team/DetailTeam";
import Semester from "../components/Manage/Semester";
import DetailResult from "../components/Manage/Result/DetailResult";
import DetailMarkResult from "../components/Manage/Result/DetailResult/DetailMarkResult";
import SummaryResult from "../components/Manage/Result/DetailResult/SummaryResult";
import EditMarkResult from "../components/Manage/Result/DetailResult/EditMarkResult";
import DetailConduct from "../components/Manage/TrainingResult/DetailConduct";
import DetailConductResult from "../components/Manage/TrainingResult/DetailConduct/DetailConductResult";

/* --Student-- */
import StudentInformation from "../components/Student/Information";
import ChangePassword from "../components/Student/ChangePassword";
import ConductStudent from "../components/Student/Conduct";
import DetailResultStudent from "../components/Student/Result/DetailResult";
import SummaryResultStudent from "../components/Student/Result/SummaryResult";

/* --Teacher-- */
import TeacherInformation from "../components/Teacher/Information";
import ChangePasswordTeacher from "../components/Teacher/ChangePassword";
import TeamTeacher from "../components/Teacher/Team";
import ResultTeacher from "../components/Teacher/Result";
import DetailResultTeacher from "../components/Teacher/Result/ListStudentResult/DetailResult";
import SummaryResultTeacher from "../components/Teacher/Result/ListStudentResult/SummaryResult";
import SubjectClassTeacher from "../components/Teacher/SubjectClass";
import ConductTeacher from "../components/Teacher/Conduct";
import EditConductTeacher from "../components/Teacher/Conduct/ListStudentConduct/EditConductTeacher";
import DetailConductTeacher from "../components/Teacher/Conduct/ListStudentConduct/DetailConductTeacher";
import Partition from "../components/Teacher/Partition";
import MainResult from "../components/Teacher/MainResult";
import MainConduct from "../components/Teacher/MainConduct";

/* --Common */
import ChatApp from "../pages/Chat";

// Public routes
const publicRoutes = [
    {
        id: 1,
        path: config.publicRoutes.home,
        component: Login,
    },
    {
        id: 2,
        path: "*",
        component: NotFound,
    },
];

const manageRoutes = [
    {
        id: 1,
        path: config.manageRoutes.manageStudent,
        component: Student,
        layout: ManageLayout,
    },
    {
        id: 2,
        path: config.manageRoutes.manageTeacher,
        component: Teacher,
        layout: ManageLayout,
    },
    {
        id: 3,
        path: config.manageRoutes.manageTeam,
        component: Team,
        layout: ManageLayout,
    },
    {
        id: 4,
        path:
            config.manageRoutes.manageTeam +
            config.manageRoutes.manageTeacherTeam,
        component: DetailTeam,
        layout: ManageLayout,
    },

    {
        id: 5,
        path: config.manageRoutes.manageClass,
        component: Class,
        layout: ManageLayout,
    },
    {
        id: 6,
        path:
            config.manageRoutes.manageClass +
            config.manageRoutes.listStudentClass,
        component: ListStudentDetail,
        layout: ManageLayout,
    },
    {
        id: 7,
        path: config.manageRoutes.manageResult,
        component: Result,
        layout: ManageLayout,
    },
    {
        id: 8,
        path:
            config.manageRoutes.manageResult +
            config.manageRoutes.listStudentClass,
        component: DetailResult,
        layout: ManageLayout,
    },
    {
        id: 9,
        path: config.manageRoutes.information,
        component: Information,
        layout: ManageLayout,
    },
    {
        id: 10,
        path: config.manageRoutes.manageTrainingResult,
        component: TrainingResult,
        layout: ManageLayout,
    },
    {
        id: 11,
        path:
            config.manageRoutes.manageTrainingResult +
            config.manageRoutes.listStudentClass,
        component: DetailConduct,
        layout: ManageLayout,
    },
    {
        id: 12,
        path:
            config.manageRoutes.manageTrainingResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.manageConductStudent,
        component: Fragment,
        layout: ManageLayout,
        childLayout: DetailLayoutConduct,
    },
    {
        id: 13,
        path:
            config.manageRoutes.manageTrainingResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.manageConductStudent +
            config.manageRoutes.semester,
        component: DetailConductResult,
        layout: ManageLayout,
        childLayout: DetailLayoutConduct,
    },
    {
        id: 14,
        path: config.manageRoutes.manageTrainingManagement,
        component: TrainingManageMent,
        layout: ManageLayout,
    },
    {
        id: 15,
        path:
            config.manageRoutes.manageTrainingManagement +
            config.manageRoutes.manageSubject,
        component: TeacherSubject,
        layout: ManageLayout,
    },
    {
        id: 16,
        path: config.manageRoutes.manageSemester,
        component: Semester,
        layout: ManageLayout,
    },
    {
        id: 17,
        path:
            config.manageRoutes.manageResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.manageResultStudent,
        component: Fragment,
        layout: ManageLayout,
        childLayout: DetailLayout,
    },
    {
        id: 18,
        path:
            config.manageRoutes.manageResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.manageResultStudent +
            config.manageRoutes.semester,
        component: DetailMarkResult,
        layout: ManageLayout,
        childLayout: DetailLayout,
    },
    {
        id: 19,
        path:
            config.manageRoutes.manageResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.manageResultStudent +
            config.manageRoutes.fullYear,
        component: SummaryResult,
        layout: ManageLayout,
        childLayout: DetailLayout,
    },
    {
        id: 20,
        path:
            config.manageRoutes.manageResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.editResultStudent,
        component: Fragment,
        layout: ManageLayout,
        childLayout: UpdateLayout,
    },
    {
        id: 21,
        path:
            config.manageRoutes.manageResult +
            config.manageRoutes.listStudentClass +
            config.manageRoutes.editResultStudent +
            config.manageRoutes.semester,
        component: EditMarkResult,
        layout: ManageLayout,
        childLayout: UpdateLayout,
    },
    {
        id: 22,
        path: config.manageRoutes.chatApp,
        component: ChatApp,
        layout: ManageLayout,
    },
];

const studentRoutes = [
    {
        id: 1,
        path: config.studentRoutes.information,
        component: StudentInformation,
        layout: StudentLayout,
    },
    {
        id: 2,
        path: config.studentRoutes.result,
        component: Fragment,
        layout: StudentLayout,
        childLayout: DetailLayoutStudent,
    },
    {
        id: 3,
        path: config.studentRoutes.result + config.studentRoutes.semester,
        component: DetailResultStudent,
        layout: StudentLayout,
        childLayout: DetailLayoutStudent,
    },
    {
        id: 4,
        path: config.studentRoutes.result + config.studentRoutes.fullYear,
        component: SummaryResultStudent,
        layout: StudentLayout,
        childLayout: DetailLayoutStudent,
    },
    {
        id: 5,
        path: config.studentRoutes.conduct,
        component: Fragment,
        layout: StudentLayout,
        childLayout: DetailLayoutConductStudent,
    },
    {
        id: 6,
        path: config.studentRoutes.conduct + config.studentRoutes.semester,
        component: ConductStudent,
        layout: StudentLayout,
        childLayout: DetailLayoutConductStudent,
    },
    {
        id: 7,
        path: config.studentRoutes.changePassword,
        component: ChangePassword,
        layout: StudentLayout,
    },
    {
        id: 8,
        path: config.studentRoutes.chat,
        component: ChatApp,
        layout: StudentLayout,
    },
];

const teacherRoutes = [
    {
        id: 1,
        path: config.teacherRoutes.information,
        component: TeacherInformation,
        layout: TeacherLayout,
    },
    {
        id: 2,
        path: config.teacherRoutes.teacherTeam,
        component: TeamTeacher,
        layout: TeacherLayout,
    },
    {
        id: 3,
        path: config.teacherRoutes.homeroom + config.teacherRoutes.result,
        component: MainResult,
        layout: TeacherLayout,
    },
    {
        id: 4,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.result +
            config.teacherRoutes.class,
        component: ResultTeacher,
        layout: TeacherLayout,
    },
    {
        id: 5,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.result +
            config.teacherRoutes.class +
            config.teacherRoutes.resultStudent,
        component: Fragment,
        layout: TeacherLayout,
        childLayout: DetailLayoutTeacher,
    },
    {
        id: 6,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.result +
            config.teacherRoutes.class +
            config.teacherRoutes.resultStudent +
            config.teacherRoutes.semester,
        component: DetailResultTeacher,
        layout: TeacherLayout,
        childLayout: DetailLayoutTeacher,
    },
    {
        id: 7,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.result +
            config.teacherRoutes.class +
            config.teacherRoutes.resultStudent +
            config.teacherRoutes.fullYear,
        component: SummaryResultTeacher,
        layout: TeacherLayout,
        childLayout: DetailLayoutTeacher,
    },
    {
        id: 8,
        path: config.teacherRoutes.homeroom + config.teacherRoutes.conduct,
        component: MainConduct,
        layout: TeacherLayout,
    },
    {
        id: 8,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.conduct +
            config.teacherRoutes.class,
        component: ConductTeacher,
        layout: TeacherLayout,
    },
    {
        id: 9,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.conduct +
            config.teacherRoutes.class +
            config.teacherRoutes.conductStudent,
        component: Fragment,
        layout: TeacherLayout,
        childLayout: DetailLayoutConductTeacher,
    },
    {
        id: 10,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.conduct +
            config.teacherRoutes.class +
            config.teacherRoutes.conductStudent +
            config.teacherRoutes.semester,
        component: DetailConductTeacher,
        layout: TeacherLayout,
        childLayout: DetailLayoutConductTeacher,
    },
    {
        id: 11,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.conduct +
            config.teacherRoutes.class +
            config.teacherRoutes.editConductStudent,
        component: Fragment,
        layout: TeacherLayout,
        childLayout: UpdateLayoutConductTeacher,
    },
    {
        id: 12,
        path:
            config.teacherRoutes.homeroom +
            config.teacherRoutes.conduct +
            config.teacherRoutes.class +
            config.teacherRoutes.editConductStudent +
            config.teacherRoutes.semester,
        component: EditConductTeacher,
        layout: TeacherLayout,
        childLayout: UpdateLayoutConductTeacher,
    },
    {
        id: 13,
        path: config.teacherRoutes.changePassword,
        component: ChangePasswordTeacher,
        layout: TeacherLayout,
    },
    {
        id: 14,
        path: config.teacherRoutes.subject,
        component: Partition,
        layout: TeacherLayout,
    },
    {
        id: 15,
        path: config.teacherRoutes.subject + config.teacherRoutes.subjectClass,
        component: SubjectClassTeacher,
        layout: TeacherLayout,
    },
    {
        id: 16,
        path: config.teacherRoutes.chatApp,
        component: ChatApp,
        layout: TeacherLayout,
    },
];

export { publicRoutes, manageRoutes, studentRoutes, teacherRoutes };
