import {
    AgencyRoutes,
    AuthRoutes,
    HouseRoutes,
    route,
    UserRoutes,
} from "../../../../../core/routing";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { isAdmin, isAgent } from "../../../../../core/modules/users/utils";
import { useLocation } from "react-router-dom";

const Header = () => {
    const { t } = useTranslation();
    const user = useUser();
    const location = useLocation();
    const { logout } = useAuthContext();

    let items = [];

    let buttons = [];

    if (!user) {
        buttons = [
            {
                color: "primary",
                href: route(AuthRoutes.Login),
                label: t("navigation.login"),
            },
            {
                color: "secondary",
                href: route(AuthRoutes.Register),
                label: t("navigation.register"),
            },
        ]
    } else {
        buttons = [
            {
                color: "secondary",
                label: t("navigation.logout"),
            }
        ];

        if (isAdmin(user)) {
            items = [
                {
                    href: route(UserRoutes.Index),
                    isActive: location.pathname.includes(UserRoutes.Index),
                    label: t("navigation.users"),
                },
                {
                    href: route(HouseRoutes.Index),
                    isActive: location.pathname.includes(HouseRoutes.Index),
                    label: t("navigation.houses"),
                },
                {
                    href: route(AgencyRoutes.Index),
                    isActive: location.pathname.includes(AgencyRoutes.Index),
                    label: t("navigation.agencies"),
                }
            ];
        }

        if (isAgent(user)) {
            items = [
                {
                    href: route(HouseRoutes.Index),
                    isActive: location.pathname.includes(HouseRoutes.Index),
                    label: t("navigation.houses"),
                },
                {
                    href: route(AgencyRoutes.Index),
                    isActive: location.pathname.includes(AgencyRoutes.Index),
                    label: t("navigation.agency"),
                }
            ]
        }
    }

    return <NavBar onLogout={logout} navItems={items} buttons={buttons} />;
};

export default Header;
