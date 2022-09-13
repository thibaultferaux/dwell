import Agency from "../Agency/Agency.entity";
import { States, Types } from "./House.constants";

export interface HouseBody {
    surfaceArea: number;
    type: Types;
    state: States;
    constructionYear: number;
    street: string;
    town: string;
    price: number;
    image: string;
    agencyId: number;
    agency?: Agency;
}
