import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Container from "../../../Design/Container";
import { BsHouse } from "react-icons/bs";
import { formatPrice } from "../../../../core/helpers/format";
import { useAuthContext } from "../../Auth/AuthProvider";
import Button from "../../../Design/Buttons/Button";
import { AuthRoutes, route } from "../../../../core/routing";
import { getImagePath } from "../../../../core/helpers/api";

const HouseDetailScreen = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { auth } = useAuthContext();

    const url = auth ? `/houses/${id}` : `/get-houses/${id}`;

    const {
        isLoading,
        error,
        data: house,
    } = useFetch(url);

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <Container>
            <img src={getImagePath(house.image)} alt="house" className="w-full mt-14 lg:aspect-video md:aspect-video aspect-square object-cover object-center roundex-xl" />
            <div className="grid grid-cols-3 mt-4 mb-12">
                <div className="col-span-2 grid grid-cols-2 h-16">
                    <div className="flex flex-col justify-between">
                        <p className="font-bold uppercase underline decoration-[3px] underline-offset-4 decoration-yellow-500 text-gray-800">{house.type + ' ' + t("house." + house.state)}</p>
                        {!auth
                            ? <p className="text-gray-500 font-medium">{house.town}</p>
                            : <p className="text-gray-500 font-medium">{house.street + ', ' + house.town}</p>
                        }
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="font-bold text-gray-800">€ {formatPrice(house.price)}</p>
                        <p className="text-gray-500 font-medium self-baseline flex gap-2 justify-between">
                            <BsHouse size={22} />{house.surfaceArea}m²
                        </p>
                    </div>
                </div>
                <div className="col-span-1 w-full">
                    {!auth
                        ? <div className="flex flex-col items-center p-6 bg-slate-100 rounded-xl gap-6">
                            <p className="text-gray-500 font-semibold text-center">Log in to view address and other details</p>
                            <div>
                                <Button color="primary" href={route(AuthRoutes.Login)} >
                                    {t("onboarding.navigation.login")}
                                </Button>
                            </div>
                        </div>
                        : <div className="flex flex-col p-6 bg-slate-100 rounded-xl gap-2 text-gray-500 text-sm">
                            <div className="mb-2">
                                <p className="text-gray-500 text-lg uppercase font-semibold">{house.agency.name}</p>
                                <hr className="w-14 border-none h-[3px] bg-yellow-500" />
                            </div>
                            <p><a className="hover:text-gray-700" href={'http://maps.google.com/?q=' + house.agency.address} target="_blank" rel="noreferrer">{house.agency.address}</a></p>
                            <p><a className="hover:text-gray-700" href={'mailto:' + house.agency.email}>{house.agency.email}</a></p>
                            <p><a className="hover:text-gray-700" href={'tel:' + house.agency.phonenumber}>{house.agency.phonenumber}</a></p>
                        </div>
                    }
                </div>
            </div>
        </Container >
    )


}

export default HouseDetailScreen;