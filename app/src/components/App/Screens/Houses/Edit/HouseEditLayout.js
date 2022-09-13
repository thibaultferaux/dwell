import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const HouseEditLayout = () => {
    const { id } = useParams();

    const {
        isLoading,
        error,
        invalidate,
        data: house,
    } = useFetch(`/houses/${id}`);

    const handleUpdate = () => {
        invalidate();
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return <Outlet context={{ house, onHouseUpdate: handleUpdate }} />
}

export default HouseEditLayout;