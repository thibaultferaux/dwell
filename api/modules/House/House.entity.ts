import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Agency from "../Agency/Agency.entity";
import { BaseEntity } from "../BaseEntity";
import { States, Types } from "./House.constants";

@Entity()
export default class House extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column("int")
    surfaceArea: number;

    @IsDefined({ always: true })
    @Column({
        type: "enum",
        enum: Types,
    })
    type: Types;

    @IsDefined({ always: true })
    @Column({
        type: "enum",
        enum: States,
    })
    state: States;

    @IsDefined({ always: true })
    @Column("int")
    constructionYear: number;

    @IsDefined({ always: true })
    @Column()
    street: string;

    @IsDefined({ always: true })
    @Column()
    town: string;

    @IsDefined({ always: true })
    @Column("float")
    price: number;

    @IsDefined({ always: true })
    @Column()
    image: string;

    @ManyToOne(() => Agency, (agency) => agency.houses, {
        onDelete: "CASCADE",
    })
    agency: Agency;
}
