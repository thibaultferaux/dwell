import { Outlet } from "react-router-dom";
import Container from "../../../Design/Container";

const HousesLayout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default HousesLayout;