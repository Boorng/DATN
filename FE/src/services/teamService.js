import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Student-- */
export const getTeamAPI = () => {
    return instance.get(`${END_POINT.Team}`);
};

export const postTeamAPI = (team) => {
    return instance.post(`${END_POINT.Team}`, team);
};

export const updateTeamAPI = (teamEdit) => {
    return instance.put(`${END_POINT.Team}`, teamEdit);
};

export const deleteTeamAPI = (id) => {
    return instance.delete(`${END_POINT.Team}/${id}`);
};
/* ---- */
