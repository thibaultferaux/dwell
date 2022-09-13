import { Outlet } from "react-router-dom";
import Container from "../../../Design/Container";

const AgenciesLayout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
}

export default AgenciesLayout;