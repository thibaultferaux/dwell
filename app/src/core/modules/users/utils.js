import { UserRoles } from "./constants";

const formatName = (user) => {
    return `${user.name} ${user.surname}`;
};

const isAdmin = (user) => {
    return user.role === UserRoles.Admin;
};

const isAgent = (user) => {
    return user.role === UserRoles.Agent;
}

export { formatName, isAdmin, isAgent };
