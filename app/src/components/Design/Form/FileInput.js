import { useRef } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import { getImagePath } from "../../../core/helpers/api";
import isVoid from "../../../core/helpers/isVoid";

const FileInput = ({
    label,
    name,
    accept = "image/*",
    onChange,
    value,
    error,
    disabled,
    ...rest
}) => {
    const ref = useRef();

    const handleChange = (e) => {
        onChange({
            target: {
                name,
                value: e.target.files[0],
            },
        });
    };

    return (
        <>
            {!isVoid(value) && (
                <img
                    className="block m-3 rounded"
                    style={{ height: "5rem" }}
                    src={
                        typeof value === "string"
                            ? getImagePath(value)
                            : URL.createObjectURL(value)
                    }
                    alt=""
                />
            )}
            <input
                className={`border mt-1 rounded-md shadow-sm focus:outline-yellow-500 focus:ring-yellow-500 w-full border-gray-300 file-input ${error ? "border-red-500" : ""}`}
                type="file"
                accept="image/*"
                name={name}
                ref={ref}
                disabled={disabled}
                onChange={handleChange}
                {...rest}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

FileInput.propTypes = {
    ...Input.propTypes,
    value: PropTypes.any,
};

export default FileInput;
