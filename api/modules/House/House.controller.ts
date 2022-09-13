import { privateEncrypt } from "crypto";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../../constants";
import ForbiddenError from "../../errors/ForbiddenError";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import HouseService from "./House.service";
import { HouseBody } from "./House.types";

// if image passed, move to uploads folder and save path
const getImage = (req: Request) => {
    if (req.files.image) {
        const image: UploadedFile = Array.isArray(req.files.image)
            ? req.files.image[0]
            : req.files.image;
        const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${image.name}`;
        image.mv(path);
        return path;
    }
    return null;
};

export default class HouseController {
    private houseService: HouseService;

    constructor() {
        this.houseService = new HouseService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const houses = await this.houseService.all(); // all houses

        return res.json(houses);
    };

    allFromAgency = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (req.user.isAgent()) {
            const houses = await this.houseService.allForAgent(
                req.user.agency.id
            ); // all houses from agency

            return res.json(houses);
        } else {
            next(new ForbiddenError());
        }
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const house = req.user
            ? await this.houseService.findOne(parseInt(req.params.id))
            : await this.houseService.findOnePublic(parseInt(req.params.id));

        return res.json(house);
    };

    unAuthorizedHouses = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const houses = await this.houseService.unAuthorizedHouses();
        return res.json(houses);
    };

    create = async (req: any, res: Response, next: NextFunction) => {
        const image = getImage(req);
        const { body } = req;
        body.image = image;

        if (req.user.isAgent()) {
            body.agency = req.user.agency;

            const house = await this.houseService.create(body);
            return res.json(house);
        } else {
            next(new ForbiddenError());
        }
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, HouseBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (req.user.isAdmin() || req.user.isAgent()) {
            let house = null;

            if (req.user.isAgent()) {
                body.agency = req.user.agency;
                house = await this.houseService.updateForAgency(
                    parseInt(req.params.id),
                    body,
                    req.user.agency.id
                );
            } else {
                house = await this.houseService.update(
                    parseInt(req.params.id),
                    body
                );
            }

            if (!house) {
                next(new NotFoundError());
                return;
            }

            return res.json(house);
        } else {
            next(new ForbiddenError());
            return;
        }
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        if (req.user.isAdmin() || req.user.isAgent()) {
            const house = req.user.isAdmin()
                ? await this.houseService.delete(parseInt(req.params.id))
                : await this.houseService.deleteForAgency(
                      parseInt(req.params.id),
                      req.user.agency.id
                  );

            if (!house) {
                next(new NotFoundError());
                return;
            }

            return res.json({});
        } else {
            next(new ForbiddenError());
            return;
        }
    };
}
