import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DataSource";
import Agency from "./Agency.entity";
import { AgencyBody } from "./Agency.types";

export default class AgencyService {
    private agencyRepository: Repository<Agency>;

    constructor() {
        this.agencyRepository = AppDataSource.getRepository(Agency);
    }

    all = async () => {
        const agencies = await this.agencyRepository.find();
        return agencies;
    };

    findOne = async (id: number) => {
        const agency = await this.agencyRepository.findOne({
            where: { id },
            relations: ["houses", "users"],
        });
        return agency;
    };

    update = async (id: number, body: AgencyBody) => {
        let agency = await this.findOne(id);

        if (agency) {
            agency = await this.agencyRepository.save({
                ...agency,
                ...body,
            });
        }

        return agency;
    };

    delete = async (id: number) => {
        const agency = await this.findOne(id);
        if (agency) {
            await this.agencyRepository.softRemove(agency);
        }
        return agency;
    };

    create = async (body: AgencyBody) => {
        const agency = await this.agencyRepository.save(
            this.agencyRepository.create(body)
        );
        return agency;
    };
}
