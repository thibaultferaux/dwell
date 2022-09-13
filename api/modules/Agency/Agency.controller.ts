import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "./Agency.service";
import { AgencyBody } from "./Agency.types";

export default class AgencyController {
    private agencyService: AgencyService;

    constructor() {
        this.agencyService = new AgencyService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const agencies = await this.agencyService.all();
        return res.json(agencies);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const agency = req.user.isAdmin()
            ? await this.agencyService.findOne(parseInt(req.params.id))
            : await this.agencyService.findOne(req.user.agency.id);

        if (!agency) {
            next(new NotFoundError());
            return;
        }

        return res.json(agency);
    };

    create = async (
        req: AuthRequest<{}, {}, AgencyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const agency = await this.agencyService.create(req.body);
        return res.json(agency);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, AgencyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        if (req.user.isAdmin() || req.user.isAgent()) {
            const agency = req.user.isAdmin()
                ? await this.agencyService.update(parseInt(req.params.id), body)
                : await this.agencyService.update(req.user.agency.id, body);

            if (!agency) {
                next(new NotFoundError());
                return;
            }

            return res.json(agency);
        }
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const agency = await this.agencyService.delete(parseInt(req.params.id));

        if (!agency) {
            next(new NotFoundError());
            return;
        }

        return res.json(agency);
    };
}
