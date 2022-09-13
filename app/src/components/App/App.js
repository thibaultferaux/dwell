import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
    AgencyRoutes,
    AuthRoutes,
    HouseRoutes,
    PublicRoutes,
    UserRoutes,
} from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import AuthContainer from "./Auth/AuthContainer";

import RoleContainer from "./Auth/RoleContainer";
import { UserRoles } from "../../core/modules/users/constants";
import UsersLayout from "./Screens/Users/UsersLayout";
import UsersOverviewScreen from "./Screens/Users/Overview/UsersOverviewScreen";
import UserDetailLayout from "./Screens/Users/Detail/UserDetailLayout";
import UserDetailScreen from "./Screens/Users/Detail/UserDetailScreen";
import UserEditScreen from "./Screens/Users/Edit/UserEditScreen";
import IndexScreen from "./Screens/Public/IndexScreen";
import HouseDetailScreen from "./Screens/Public/HouseDetailScreen";
import RegisterScreen from "./Auth/Register/RegisterScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";
import HousesOverview from "./Shared/Houses/HousesOverview";
import HousesLayout from "./Screens/Houses/HousesLayout";
import HousesOverviewScreen from "./Screens/Houses/Overview/HousesOverviewScreen";
import HouseAddScreen from "./Screens/Houses/Add/HouseAddScreen";
import HouseEditScreen from "./Screens/Houses/Edit/HouseEditScreen";
import HouseEditLayout from "./Screens/Houses/Edit/HouseEditLayout";
import AgencyDetailLayout from "./Screens/Agencies/Detail/AgencyDetailLayout";
import AgencyDetailScreen from "./Screens/Agencies/Detail/AgencyDetailScreen";
import AgencyEditScreen from "./Screens/Agencies/Edit/AgencyEditScreen";
import AgenciesLayout from "./Screens/Agencies/AgenciesLayout";
import AgenciesRedirect from "./Screens/Agencies/AgenciesRedirect";
import AgencyAddAgentScreen from "./Screens/Agencies/Add/AgencyAddAgentScreen";
import AgencyAddScreen from "./Screens/Agencies/Add/AgencyAddScreen";

const App = () => {


    return (
        <AuthProvider>
            <Routes>
                <Route path={PublicRoutes.Index} element={<AppLayout />} >
                    <Route index element={<IndexScreen />} />
                    <Route path={PublicRoutes.Detail} element={<HouseDetailScreen />} />
                    <Route
                        path="*"
                        element={<Navigate to={PublicRoutes.Index} />}
                    />
                </Route>
                <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
                    <Route path={AuthRoutes.Login} element={<LoginScreen />} />
                    <Route path={AuthRoutes.Register} element={<RegisterScreen />} />
                    <Route
                        path="*"
                        element={<Navigate to={PublicRoutes.Index} />}
                    />
                </Route>
                <Route
                    element={
                        <AuthContainer>
                            <AppLayout />
                        </AuthContainer>
                    }>

                    {/* Admin & Agent Routes */}
                    <Route element={
                        <RoleContainer roles={[UserRoles.Admin, UserRoles.Agent]}>
                            <Outlet />
                        </RoleContainer>
                    }>
                        {/* Houses */}
                        <Route
                            path={HouseRoutes.Index}
                            element={<HousesLayout />}>
                            <Route index element={<HousesOverviewScreen />} />
                            <Route element={
                                <RoleContainer roles={[UserRoles.Agent]}>
                                    <Outlet />
                                </RoleContainer>
                            }>
                                <Route path={HouseRoutes.New} element={<HouseAddScreen />} />
                                <Route path={HouseRoutes.Edit} element={<HouseEditLayout />}>
                                    <Route index element={<HouseEditScreen />} />
                                </Route>
                            </Route>
                        </Route>

                        {/* Agency */}
                        <Route
                            path={AgencyRoutes.Index}
                            element={<AgenciesLayout />}>
                            <Route index element={<AgenciesRedirect />} />
                            <Route path={AgencyRoutes.New} element={<AgencyAddScreen />} />
                            <Route path={AgencyRoutes.Agent} element={<AgencyAddAgentScreen />} />
                            <Route
                                path={AgencyRoutes.Detail}
                                element={<AgencyDetailLayout />}>
                                <Route index element={<AgencyDetailScreen />} />
                                <Route
                                    path={AgencyRoutes.Edit}
                                    element={<AgencyEditScreen />}
                                />
                            </Route>
                        </Route>

                    </Route>


                    {/* Admin */}
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Admin]}>
                                <Outlet />
                            </RoleContainer>
                        }>

                        {/* Users */}
                        <Route
                            path={UserRoutes.Index}
                            element={<UsersLayout />}>
                            <Route index element={<UsersOverviewScreen />} />
                            <Route
                                path={UserRoutes.Detail}
                                element={<UserDetailLayout />}>
                                <Route index element={<UserDetailScreen />} />
                                <Route
                                    path={UserRoutes.Edit}
                                    element={<UserEditScreen />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
