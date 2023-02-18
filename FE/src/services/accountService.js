import instance from "../utils/instance";
import END_POINT from "./constant";

/* --Account-- */
export const changePasswordAPI = (id, password) => {
    return instance.post(`${END_POINT.Account}/change-password`, {
        id,
        password,
    });
};

export const checkPasswordAPI = (id, password) => {
    return instance.get(`${END_POINT.Account}/check-password/${id}`, {
        params: {
            password,
        },
    });
};

export const deleteAccountAPI = (id) => {
    return instance.delete(`${END_POINT.Account}/${id}`);
};

/* ---- */
