import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { formatName } from "../../../../../core/modules/users/utils";
import { UserRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import DetailGroup from "../../../../Design/DetailGroup";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const UserDetailScreen = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();

    useTitle(user ? formatName(user) : "");

    return (
        <div className="mt-20">
            <BackButton href={route(UserRoutes.Index)} />
            <PageHeader>
                <Title>{user.name}</Title>
            </PageHeader>
            <DetailGroup label={t("fields.name")}>
                {user.name}
            </DetailGroup>
            <DetailGroup label={t("fields.surname")}>
                {user.surname}
            </DetailGroup>
            <DetailGroup label={t("fields.email")}>
                {user.email}
            </DetailGroup>
            <div className="inline-block mt-6">
                <Button href={route(UserRoutes.Edit, { id: user.id })}>
                    {t("buttons.edit")}
                </Button>
            </div>
        </div>
    );
};

export default UserDetailScreen;
