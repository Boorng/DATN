import jwt_decode from "jwt-decode";

export const handleCheck = () => {
    let token = localStorage.getItem("token");
    if (token) {
        let decodedToken = jwt_decode(token);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            return false;
        } else {
            console.log("Valid token");
            return decodedToken;
        }
    } else {
        return false;
    }
};
