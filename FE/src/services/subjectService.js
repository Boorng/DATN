import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Class-- */
export const getSubjectAPI = (grade) => {
    return instance.get(`${END_POINT.Subject}/grade/${grade}`);
};
/* ---- */
