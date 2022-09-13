import { Outlet } from "react-router-dom";
import Container from "../../../Design/Container";

const UsersLayout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default UsersLayout;
