import { Outlet } from "react-router-dom";
import Header from "./Shared/Generic/Header/Header";

const AppLayout = () => {
    return (
        <div className="mb-12">
            <Header />
            <Outlet />
        </div>
    );
};

export default AppLayout;
