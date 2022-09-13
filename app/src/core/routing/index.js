const PublicRoutes = {
    Index: "/",
    Detail: "/house/:id",
}

const AuthRoutes = {
    Index: "/auth",
    Login: "/auth/login",
    Register: "/auth/register",
};

const HouseRoutes = {
    Index: "/houses",
    New: "/houses/new",
    Edit: "/houses/:id/edit",
};

const AgencyRoutes = {
    Index: "/agencies",
    New: "/agencies/new",
    Detail: "/agencies/:id",
    Edit: "/agencies/:id/edit",
    Agent: "/agencies/:id/agent",
}

const UserRoutes = {
    Index: "/users",
    Detail: "/users/:id",
    Edit: "/users/:id/edit",
};

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { PublicRoutes, AuthRoutes, HouseRoutes, AgencyRoutes, UserRoutes };
