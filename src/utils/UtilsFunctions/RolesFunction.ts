import {DELETE, CREATE, EDIT} from "../../constants/features";
import {ADMIN, USER} from "../../constants/roles";

export const defineRole = (features: Array<string>) => {
    if(features.includes(CREATE) && features.includes(EDIT) && features.includes(DELETE)) {
        return ADMIN;
    } else if (features.includes(EDIT)) {
        return USER;
    }
};
