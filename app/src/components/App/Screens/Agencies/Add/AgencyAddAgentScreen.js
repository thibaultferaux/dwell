import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { UserRoles } from "../../../../../core/modules/users/constants";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import UserForm from "../../../Shared/Users/Form/UserForm";

const AgencyAddAgentScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useUser();

    const { id } = useParams();

    useTitle(t("agencies.addAgent.title"))

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        if (isAdmin(user)) {
            data.role = UserRoles.Agent;
            data.agency = id;
        }
        mutate(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(AgencyRoutes.Index);
            },
        });
    };

    return (
        <div className="mt-20">
            <BackButton href={route(AgencyRoutes.Index)} />
            <PageHeader>
                <Title>{t("agencies.addAgent.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <UserForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default AgencyAddAgentScreen;