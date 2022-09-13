import { NextFunction, Request, Response, Router } from "express";
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import * as path from "path";
import HouseController from "../modules/House/House.controller";
import AgencyController from "../modules/Agency/Agency.controller";

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };

const registerOnboardingRoutes = (router: Router) => {
    const authController = new AuthController();
    router.post("/login", authLocal, useMethod(authController.login));

    const userController = new UserController();
    router.post("/register", useMethod(userController.create));

    const houseController = new HouseController();
    router.get("/get-houses", useMethod(houseController.unAuthorizedHouses));
    router.get("/get-houses/:id", useMethod(houseController.find));
};

const registerAdminRoutes = (router: Router) => {
    const adminRouter = Router();

    const userController = new UserController();
    adminRouter.get("/users", useMethod(userController.all));
    adminRouter.get("/users/:id", useMethod(userController.find));
    adminRouter.delete("/users/:id", useMethod(userController.delete));

    const agencyController = new AgencyController();
    adminRouter.get("/agencies", useMethod(agencyController.all));
    adminRouter.post("/agencies", useMethod(agencyController.create));
    adminRouter.delete("/agencies/:id", useMethod(agencyController.delete));

    router.use(withRole(UserRole.Admin), adminRouter);
};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const userController = new UserController();
    authRouter.get("/me", useMethod(userController.me));
    authRouter.patch("/users/:id", useMethod(userController.update));
    authRouter.post("/users", useMethod(userController.create));

    const agencyController = new AgencyController();
    authRouter.get("/agencies/:id", useMethod(agencyController.find));
    authRouter.patch("/agency/:id", useMethod(agencyController.update));

    const houseController = new HouseController();
    authRouter.get("/houses", useMethod(houseController.all));
    authRouter.get("/houses/:id", useMethod(houseController.find));
    authRouter.patch("/houses/:id", useMethod(houseController.update));
    authRouter.delete("/houses/:id", useMethod(houseController.delete));
    authRouter.get("/agency/houses", useMethod(houseController.allFromAgency));
    authRouter.post("/agency/houses", useMethod(houseController.create));

    registerAdminRoutes(authRouter);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // public folder
    app.use("/public", express.static(path.resolve(__dirname, "../public")));

    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes };
