import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
    children,
    color = "primary",
    type = "button",
    onClick,
    disabled = false,
    href,
    className = "",
}) => {
    const props = {
        className: `button button-${color} ${className}`,
        type,
        onClick: onClick,
        disabled: disabled,
    };
    if (href) {
        return (
            <Link to={href} {...props}>
                {children}
            </Link>
        );
    } else {
        return (
            <button {...props}>
                {children}
            </button>
        );
    }
};

Button.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "danger"]),
    type: PropTypes.oneOf(["submit", "button"]),
    onClick: PropTypes.func,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
