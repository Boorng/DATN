import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Account-- */

export const validateAPI = (loginModel) => {
    return instance.post(`${END_POINT.Login}/login`, loginModel);
};

/* ---- */
