import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, UserRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import { formatName } from "../../../../../core/modules/users/utils";
import Button from "../../../../Design/Buttons/Button";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import useTitle from "../../../../../core/hooks/useTitle";
import TableHeaderCell from "../../../../Design/Table/TableHeaderCell";
import TableRowCell from "../../../../Design/Table/TableRowCell";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import { TbEdit } from "react-icons/tb";

const UsersOverviewScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data: users, error, invalidate } = useFetch("/users");

    useTitle(t("users.title"));

    const handleUserDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <div className="mt-20">
            <PageHeader>
                <Title>{t("users.overview.title")}</Title>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <TableHeaderCell>{t("fields.name")}</TableHeaderCell>
                        <TableHeaderCell>{t("fields.email")}</TableHeaderCell>
                        <TableHeaderCell>{t("fields.role")}</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableHeader>
                }>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableRowCell>
                            <Link
                                to={route(UserRoutes.Detail, {
                                    id: user.id,
                                })}>
                                {formatName(user)}
                            </Link>
                        </TableRowCell>
                        <TableRowCell>{user.email}</TableRowCell>
                        <TableRowCell>{user.role}</TableRowCell>
                        <TableRowCell>
                            <div className="flex justify-end gap-2">
                                <DeleteButton
                                    id={user.id}
                                    scope="users"
                                    onSuccess={handleUserDelete}
                                />
                                <Button href={route(UserRoutes.Edit, { id: user.id })} color="primary">
                                    <TbEdit />
                                </Button>
                            </div>
                        </TableRowCell>
                    </TableRow>
                ))}
            </Table>
        </div>
    );
};

export default UsersOverviewScreen;
