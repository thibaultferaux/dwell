import PropTypes from "prop-types";

const Label = ({ htmlFor, children }) => {
    return (
        <label className="block text-sm font-medium text-gray-700" htmlFor={htmlFor}>
            {children}
        </label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string,
};

export default Label;
