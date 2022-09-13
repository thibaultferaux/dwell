import { formatPrice } from "../../../core/helpers/format";
import { BsHouse } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PublicRoutes, route } from "../../../core/routing";
import { getImagePath } from "../../../core/helpers/api";

const HouseCard = ({ house }) => {
    return (
        <Link to={route(PublicRoutes.Detail, {
            id: house.id,
        })}>
            <div className="col-span-1 rounded-xl flex flex-col shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <img src={getImagePath(house.image)} alt="house" className="w-full aspect-[3/2] object-cover object-center rounded-t-[inherit]" />
                <div className="p-4 flex justify-between h-24">
                    <div className="flex flex-col justify-between">
                        <p className="font-bold uppercase underline decoration-[3px] underline-offset-4 decoration-yellow-500 text-gray-800">{house.type}</p>
                        <p className="text-gray-500 font-medium">{house.town}</p>
                    </div>
                    <div className="flex flex-col text-right justify-between">
                        <p className="font-bold text-gray-800">€ {formatPrice(house.price)}</p>
                        <p className="text-gray-500 font-medium self-baseline flex gap-2 justify-between ml-auto">
                            <BsHouse size={22} />{house.surfaceArea}m²
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HouseCard;