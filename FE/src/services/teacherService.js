import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Teacher-- */
export const getTeacherAPI = (search = "", teamId = "") => {
    return instance.get(`${END_POINT.Teacher}`, {
        params: {
            search,
            teamId,
        },
    });
};

export const getTeacherNoLeaveAPI = (search, teamId) => {
    return instance.get(`${END_POINT.Teacher}/no-leave`, {
        params: {
            search,
            teamId,
        },
    });
};

export const getTeacherByAccount = (accountId) => {
    return instance.get(`${END_POINT.Teacher}/account/${accountId}`);
};

export const getTeamTeacherAPI = (teamId) => {
    return instance.get(`${END_POINT.Teacher}/team/${teamId}`);
};

export const UploadImageTeacherAPI = (teacherId, formData) => {
    return instance.post(
        `${END_POINT.Teacher}/upload-image/${teacherId}`,
        formData
    );
};

export const UpdateSeenNotify = (teacherId) => {
    return instance.post(`${END_POINT.Teacher}/update-seennotify/${teacherId}`);
};

export const postTeacherAPI = (teacher) => {
    return instance.post(`${END_POINT.Teacher}`, teacher);
};

export const postListTeacherAPI = (listTeacher) => {
    return instance.post(`${END_POINT.Teacher}/add-list`, listTeacher);
};

export const updateTeacherAPI = (teacherEdit) => {
    return instance.put(`${END_POINT.Teacher}`, teacherEdit);
};

export const deleteTeacherAPI = (id) => {
    return instance.delete(`${END_POINT.Teacher}/${id}`);
};

export const checkDataTeacherAPI = (id) => {
    return instance.get(`${END_POINT.Teacher}/check-data/${id}`);
};

export const updateTeamTeacherAPI = (teamId, teacherIds = []) => {
    return instance.put(
        `${END_POINT.Teacher}/update-team/${teamId}`,
        teacherIds
    );
};

export const updateManageTeamTeacherAPI = (manageIds) => {
    return instance.post(`${END_POINT.Teacher}/update-manage-team`, manageIds);
};

export const getManageTeamTeacherAPI = (teamId) => {
    return instance.get(`${END_POINT.Teacher}/manage-team/${teamId}`);
};

export const deleteTeacherTeamAPI = (teacherId) => {
    return instance.post(`${END_POINT.Teacher}/delete-team/${teacherId}`);
};

/* ---- */
