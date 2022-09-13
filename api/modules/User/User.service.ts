import { AppDataSource } from "../../database/DataSource";
import User from "./User.entity";
import { Repository } from "typeorm";
import { UserBody } from "./User.types";
import { UserRole } from "./User.constants";

export default class UserService {
    private repository: Repository<User>;

    constructor() {
        const repository = AppDataSource.getRepository(User);
        this.repository = repository;
    }

    all = async () => {
        // don't show password
        const users = await this.repository.find();
        return users;
    };

    findOne = async (id: number) => {
        const user = await this.repository.findOneBy({ id });
        return user;
    };

    findOneBy = async (options: object) => {
        const user = await this.repository.findOneBy(options);
        return user;
    };

    findOneWithAgent = async (options: object) => {
        const user = await this.repository.findOne({
            where: options,
            relations: ["agency"],
        });
        return user;
    };

    findByEmailWithPassword = async (email: string) => {
        const user = await this.repository
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .select("user.password")
            .getOne();
        return user;
    };

    create = async (body: UserBody) => {
        const user = await this.repository.save(this.repository.create(body));
        return user;
    };

    createAgent = async (body: UserBody, agencyId) => {
        const user = await this.repository.save(
            this.repository.create({
                ...body,
                role: UserRole.Agent,
                agency: agencyId,
            })
        );
        return user;
    };

    createUser = async (body: UserBody) => {
        // create user with role user
        const user = await this.repository.save(
            this.repository.create({ ...body, role: UserRole.User })
        );
        return user;
    };

    update = async (id: number, body: UserBody) => {
        let user = await this.findOne(id);
        if (user) {
            user = await this.repository.save({ ...user, ...body });
        }
        return user;
    };

    updateForUser = async (id: number, body: UserBody) => {
        let user = await this.findOne(id);

        if (user) {
            user = await this.repository.save({
                ...user,
                ...(body.name && { name: body.name }),
                ...(body.surname && { surname: body.surname }),
                ...(body.email && { email: body.email }),
            });
        }
        return user;
    };

    delete = async (id: number) => {
        let user = await this.findOne(id);
        if (user) {
            await this.repository.softDelete({ id });
        }
        return user;
    };
}
