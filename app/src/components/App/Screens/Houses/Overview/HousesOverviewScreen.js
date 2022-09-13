import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import { formatPrice } from "../../../../../core/helpers/format";
import isVoid from "../../../../../core/helpers/isVoid";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { ClientRoutes, HouseRoutes, PublicRoutes, route } from "../../../../../core/routing";
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
import { TbEdit } from "react-icons/tb";
import { useUser } from "../../../Auth/AuthProvider";
import { isAdmin } from "../../../../../core/modules/users/utils";

const HousesOverviewScreen = () => {
    const { t } = useTranslation();

    const user = useUser();

    const url = isAdmin(user) ? "/houses" : "/agency/houses";

    const {
        isLoading,
        data: houses,
        error,
        invalidate,
    } = useFetch(url);

    useTitle(t("houses.title"));

    const handleHousesDelete = () => {
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
                <Title>{t("houses.overview.title")}</Title>
                {!isAdmin(user) && (
                    <Button href={HouseRoutes.New}>
                        {t("houses.overview.create")}
                    </Button>
                )}
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <TableHeaderCell>{t("houses.fields.town")}</TableHeaderCell>
                        <TableHeaderCell>{t("houses.fields.street")}</TableHeaderCell>
                        <TableHeaderCell>{t("houses.fields.state")}</TableHeaderCell>
                        <TableHeaderCell>{t("houses.fields.type")}</TableHeaderCell>
                        <TableHeaderCell>{t("houses.fields.surfaceArea")}</TableHeaderCell>
                        <TableHeaderCell>{t("houses.fields.constructionYear")}</TableHeaderCell>
                        <TableHeaderCell>{t("houses.fields.price")}</TableHeaderCell>
                        {isAdmin(user) && (
                            <TableHeaderCell>{t("houses.fields.agency")}</TableHeaderCell>
                        )}
                        <TableHeaderCell></TableHeaderCell>
                    </TableHeader>
                }>

                {houses.map((house) => (
                    <TableRow key={house.id}>
                        <TableRowCell>
                            {house.town}
                        </TableRowCell>
                        <TableRowCell>
                            {house.street}
                        </TableRowCell>
                        <TableRowCell>
                            {t('house.' + house.state)}
                        </TableRowCell>
                        <TableRowCell>
                            {house.type}
                        </TableRowCell>
                        <TableRowCell>
                            {house.surfaceArea}m²
                        </TableRowCell>
                        <TableRowCell>
                            {house.constructionYear}
                        </TableRowCell>
                        <TableRowCell>
                            € {formatPrice(house.price)}
                        </TableRowCell>
                        {isAdmin(user) && (
                            <TableRowCell>
                                {house.agency.name}
                            </TableRowCell>
                        )}
                        <TableRowCell>
                            <div className="flex justify-end gap-2">
                                <DeleteButton
                                    id={house.id}
                                    scope="houses"
                                    onSuccess={handleHousesDelete}
                                />
                                {
                                    !isAdmin(user) && (
                                        <Button href={route(HouseRoutes.Edit, { id: house.id })} color="primary">
                                            <TbEdit />
                                        </Button>
                                    )
                                }
                            </div>
                        </TableRowCell>
                    </TableRow>
                ))}
            </Table>
        </div>
    );
}

export default HousesOverviewScreen;