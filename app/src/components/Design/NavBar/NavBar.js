import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";
import Container from "../Container";

const NavBar = ({ navItems = [], buttons = [], onLogout }) => {
    return (
        <nav className="fixed z-10 bg-white top-0 left-0 right-0 h-20 flex items-center">
            <Container>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <Link to="/">
                            <img width="130" src="/logo-color.png" alt="logo" />
                        </Link>
                        <ul className="flex gap-4">
                            {navItems.map((navItem) => (
                                <li key={navItem.href}>
                                    <Link
                                        className={`font-medium text-lg text-gray-400 hover:text-yellow-500 ${navItem.isActive ? "underline decoration-yellow-500 underline-offset-4 decoration-[3px]" : ""
                                            }`}
                                        to={navItem.href}>
                                        {navItem.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-8">
                        {buttons.map((button, counter) => (
                            <>
                                {
                                    button.href
                                        ? <Button key={counter} color={button.color} href={button.href}>{button.label}</Button>
                                        : <Button key={counter} color={button.color} onClick={onLogout}>{button.label}</Button>
                                }
                            </>
                        ))}
                    </div>
                </div>
            </Container>
        </nav >
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.oneOf(["primary", "secondary"]),
            href: PropTypes.string,
            label: PropTypes.string,
        })
    ),
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default NavBar;
