import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { route, UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useTitle(t("users.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(UserRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(UserRoutes.Index)} />
            <PageHeader>
                <Title>{t("users.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <UserForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default UserAddScreen;
