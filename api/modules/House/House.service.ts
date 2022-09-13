import { log } from "console";
import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DataSource";
import House from "./House.entity";
import { HouseBody } from "./House.types";

export default class HouseService {
    private houseRepository: Repository<House>;

    constructor() {
        this.houseRepository = AppDataSource.getRepository(House);
    }

    all = async () => {
        const houses = await this.houseRepository.find({
            relations: ["agency"],
        });
        return houses;
    };

    allForAgent = async (agencyId: number) => {
        const houses = await this.houseRepository.find({
            relations: ["agency"],
            where: { agency: { id: agencyId } },
        });
        return houses;
    };

    findOne = async (id: number) => {
        const house = await this.houseRepository.findOne({
            where: { id },
            relations: ["agency"],
        });
        return house;
    };

    findOnePublic = async (id: number) => {
        const house = await this.houseRepository.findOne({
            where: { id },
            select: {
                id: true,
                surfaceArea: true,
                type: true,
                state: true,
                constructionYear: true,
                town: true,
                price: true,
                image: true,
            },
        });
        return house;
    };

    findOneForAgent = async (id: number, agencyId: number) => {
        const house = await this.houseRepository.findOne({
            where: { id, agency: { id: agencyId } },
            relations: ["agency"],
        });
        return house;
    };

    unAuthorizedHouses = async () => {
        const houses = await this.houseRepository.find({
            select: {
                id: true,
                surfaceArea: true,
                type: true,
                state: true,
                constructionYear: true,
                town: true,
                price: true,
                image: true,
            },
        });
        return houses;
    };

    create = async (body: HouseBody) => {
        const house = await this.houseRepository.save(
            this.houseRepository.create(body)
        );
        return house;
    };

    update = async (id: number, body: HouseBody) => {
        let house = await this.findOne(id);
        if (house) {
            house = await this.houseRepository.save({
                ...house,
                ...body,
            });
        }
        return house;
    };

    updateForAgency = async (id: number, body: HouseBody, agencyId: number) => {
        let house = await this.findOneForAgent(id, agencyId);
        if (house) {
            house = await this.houseRepository.save({
                ...house,
                ...body,
            });
        }
        return house;
    };

    delete = async (id: number) => {
        let house = await this.findOne(id);
        if (house) {
            await this.houseRepository.softRemove(house);
        }
        return house;
    };

    deleteForAgency = async (id: number, agencyId: number) => {
        const house = await this.findOneForAgent(id, agencyId);

        if (house) {
            await this.houseRepository.softRemove(house);
        }
        return house;
    };
}
