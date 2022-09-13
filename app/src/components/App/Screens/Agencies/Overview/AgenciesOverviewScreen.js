import { useTranslation } from "react-i18next";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { formatName } from "../../../../../core/modules/users/utils";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableHeaderCell from "../../../../Design/Table/TableHeaderCell";
import TableRow from "../../../../Design/Table/TableRow";
import TableRowCell from "../../../../Design/Table/TableRowCell";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgenciesOverviewScreen = () => {
    const { t } = useTranslation();

    const {
        isLoading,
        data: agencies,
        error,
        invalidate,
    } = useFetch("/agencies");

    useTitle(t("agencies.title"));

    const handleAgencyDelete = () => {
        invalidate();
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <div className="mt-20">
            <PageHeader>
                <Title>{t("agencies.overview.title")}</Title>
                <Button href={AgencyRoutes.New}>
                    {t("agencies.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <TableHeaderCell>{t("fields.name")}</TableHeaderCell>
                        <TableHeaderCell>{t("fields.email")}</TableHeaderCell>
                        <TableHeaderCell>{t("fields.address")}</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableHeader>
                }>
                {agencies.map((agency) => (
                    <TableRow key={agency.id}>
                        <TableRowCell>
                            <Link
                                to={route(AgencyRoutes.Detail, {
                                    id: agency.id,
                                })}>
                                {agency.name}
                            </Link>
                        </TableRowCell>
                        <TableRowCell>{agency.email}</TableRowCell>
                        <TableRowCell>{agency.address}</TableRowCell>
                        <TableRowCell>
                            <div className="flex justify-end gap-2">
                                <DeleteButton
                                    id={agency.id}
                                    scope="agencies"
                                    onSuccess={handleAgencyDelete}
                                />
                                <Button href={route(AgencyRoutes.Edit, { id: agency.id })} color="primary">
                                    <TbEdit />
                                </Button>
                            </div>
                        </TableRowCell>
                    </TableRow>
                ))}
            </Table>
        </div>
    );
}

export default AgenciesOverviewScreen;