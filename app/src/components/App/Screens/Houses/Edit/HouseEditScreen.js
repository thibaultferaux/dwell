import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { HouseRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import HouseForm from "../../../Shared/Houses/Form/HouseForm";

const HouseEditScreen = () => {
    const { t } = useTranslation();
    const { house, onHouseUpdate } = useOutletContext();
    const navigate = useNavigate();

    useTitle(t("houses.edit.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/houses/${house.id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                onHouseUpdate();
                navigate(route(HouseRoutes.Index));
            },
        });
    };

    return (
        <div className="mt-20">
            <BackButton href={route(HouseRoutes.Index)} />
            <PageHeader>
                <Title>{t("houses.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <HouseForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={house}
            />
        </div>
    );


}

export default HouseEditScreen;