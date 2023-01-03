// Layouts
import DefaultLayout from "../layouts/DefaultLayout";
import HeadFootLayout from "../layouts/HeadFootLayout";

// Pages
import Home from "../pages/Home";
import Rule from "../pages/Rule";
import Contact from "../pages/Contact";
import Login from "../pages/Login";

// Config
import config from "../config";
import Student from "../components/Manage/Student";
import Teacher from "../components/Manage/Teacher";
import Class from "../components/Manage/Class";
import Result from "../components/Manage/Result";
import Information from "../components/Manage/Information";
import ManageLayout from "../layouts/ManageLayout";
import TrainingResult from "../components/Manage/TrainingResult";
import TrainingManageMent from "../components/Manage/TrainingManagement'";
import ListStudentDetail from "../components/Manage/ListStudentDetail";

// Public routes
const publicRoutes = [
    {
        id: 1,
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        id: 2,
        path: config.routes.rule,
        component: Rule,
        layout: DefaultLayout,
    },
    {
        id: 3,
        path: config.routes.contact,
        component: Contact,
        layout: DefaultLayout,
    },
    {
        id: 4,
        path: config.routes.login,
        component: Login,
        layout: HeadFootLayout,
    },
];

const manageRoutes = [
    {
        id: 1,
        path: config.routes.manageStudent,
        component: Student,
        layout: ManageLayout,
    },
    {
        id: 2,
        path: config.routes.manageTeacher,
        component: Teacher,
        layout: ManageLayout,
    },
    {
        id: 3,
        path: config.routes.manageClass,
        component: Class,
        layout: ManageLayout,
    },
    {
        id: 4,
        path: config.routes.manageClass + config.routes.listStudentClass,
        component: ListStudentDetail,
        layout: ManageLayout,
    },
    {
        id: 4,
        path: config.routes.manageResult,
        component: Result,
        layout: ManageLayout,
    },
    {
        id: 5,
        path: config.routes.information,
        component: Information,
        layout: ManageLayout,
    },
    {
        id: 6,
        path: config.routes.manageTrainingResult,
        component: TrainingResult,
        layout: ManageLayout,
    },
    {
        id: 7,
        path: config.routes.manageTrainingManagement,
        component: TrainingManageMent,
        layout: ManageLayout,
    },
];

export { publicRoutes, manageRoutes };
