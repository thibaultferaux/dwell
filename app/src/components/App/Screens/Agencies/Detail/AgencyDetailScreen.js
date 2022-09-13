import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { AgencyRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import Container from "../../../../Design/Container";
import DetailGroup from "../../../../Design/DetailGroup";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";

const AgencyDetailScreen = () => {
    const { t } = useTranslation();
    const { agency } = useOutletContext();
    const user = useUser();

    useTitle(agency ? agency.name : "");

    return (
        <div className="mt-20">
            {isAdmin(user) && (
                <BackButton href={route(AgencyRoutes.Index)} />
            )}
            <PageHeader>
                <Title>{agency.name}</Title>
                <div>
                    <Button href={route(AgencyRoutes.Edit, { id: agency.id })}>
                        {t("agencies.detail.edit")}
                    </Button>
                </div>
            </PageHeader>
            <DetailGroup label={t("agencies.fields.name")}>
                {agency.name}
            </DetailGroup>
            <DetailGroup label={t("agencies.fields.email")}>
                {agency.email}
            </DetailGroup>
            <DetailGroup label={t("agencies.fields.address")}>
                {agency.address}
            </DetailGroup>
            <DetailGroup label={t("agencies.fields.phonenumber")}>
                {agency.phonenumber}
            </DetailGroup>
            <div className="inline-block mt-6">
                <Button href={route(AgencyRoutes.Agent, { id: agency.id })}>
                    {t("agencies.detail.agent")}
                </Button>
            </div>
        </div>

    )
}

export default AgencyDetailScreen;