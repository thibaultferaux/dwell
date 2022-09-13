import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import House from "../House/House.entity";
import User from "../User/User.entity";

@Entity()
export default class Agency extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @IsDefined({ always: true })
    @Column()
    address: string;

    @IsDefined({ always: true })
    @Column()
    phonenumber: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column({ unique: true })
    email: string;

    @OneToMany(() => House, (house) => house.agency, {
        cascade: true,
    })
    houses: House[];

    @OneToMany(() => User, (user) => user.agency, {
        cascade: true,
    })
    users: User[];
}
