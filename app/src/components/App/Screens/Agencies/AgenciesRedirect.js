import { Navigate } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { isAdmin, isAgent } from "../../../../core/modules/users/utils";
import { AgencyRoutes, route } from "../../../../core/routing";
import Alert from "../../../Design/Alert";
import { useUser } from "../../Auth/AuthProvider";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import AgenciesOverviewScreen from "./Overview/AgenciesOverviewScreen";

const AgenciesRedirect = () => {
    const { isLoading, data: user, error } = useFetch(`/me`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isAgent(user)) {
        return <Navigate to={route(AgencyRoutes.Detail, { id: user.agency.id })} replace />
    }

    return <AgenciesOverviewScreen />;
};

export default AgenciesRedirect;