import Agency from "../Agency/Agency.entity";
import { UserRole } from "./User.constants";

export interface UserBody {
    name: string;
    surname: string;
    email: string;
    role?: UserRole;
    password?: string;
    agencyId: number;
    agency?: Agency;
}
