import PropTypes from "prop-types";

const Select = ({ name, options = [], onChange, value, error, disabled }) => {
    return (
        <>
            <select
                className={`border mt-1 rounded-md shadow-sm focus:outline-yellow-500 focus:ring-yellow-500 w-full px-4 py-2 border-gray-300 ${error ? "border-red-500" : ""}`}
                name={name}
                disabled={disabled}
                value={String(value) || ""}
                onChange={onChange}>
                <option>--</option>
                {options &&
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
        })
    ),
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Select;
