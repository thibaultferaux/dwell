import { NextFunction, Request, Response } from "express";
import { runInNewContext } from "vm";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const users = await this.userService.all();
        return res.json(users);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOneBy({ id: req.params.id });
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    me = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOneWithAgent({
            id: req.user.id,
        });
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    create = async (
        req: AuthRequest<{}, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        let user;

        if (req.user && (req.user.isAdmin() || req.user.isAgent())) {
            user = req.user.isAdmin()
                ? await this.userService.create(body)
                : await this.userService.createAgent(body, req.user.agency.id);
        } else {
            user = await this.userService.createUser(body);
        }

        return res.json(user);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { body } = req;

            const user = req.user.isAdmin()
                ? await this.userService.update(parseInt(req.params.id), body)
                : await this.userService.updateForUser(req.user.id, body);

            if (!user) {
                next(new NotFoundError());
                return;
            }
            return res.json(user);
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.delete(parseInt(req.params.id));
            if (!user) {
                next(new NotFoundError());
            }
            return res.json({});
        } catch (err) {
            next(err);
        }
    };
}
