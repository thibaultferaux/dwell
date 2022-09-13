import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert";
import HouseCard from "../../../Design/Cards/HouseCard";
import Container from "../../../Design/Container";
import LoadingIndicator from "../Generic/LoadingIndicator/LoadingIndicator";

const HousesOverview = () => {
    const { isLoading, data: houses, error } = useFetch("/get-houses");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <Container>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mb-12">
                {houses.map((house) => (
                    <HouseCard house={house} key={house.id} />
                ))}
            </div>
        </Container>
    )
};

export default HousesOverview