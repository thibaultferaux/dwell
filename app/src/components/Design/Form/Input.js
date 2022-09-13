import PropTypes from "prop-types";

const Input = ({
    type = "text",
    label,
    name,
    onChange,
    value,
    error,
    children,
    disabled,
    ...rest
}) => {
    return (
        <>
            <input
                className={`border mt-1 rounded-md shadow-sm focus:outline-yellow-500 focus:ring-yellow-500 w-full px-4 py-2 border-gray-300 ${error ? "border-red-500" : ""}`}
                type={type}
                name={name}
                disabled={disabled}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {children}
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Input;
