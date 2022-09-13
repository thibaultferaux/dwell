import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const TypeSelect = (props) => {

    const types = [
        { value: 'Apartment', label: 'Apartment' },
        { value: 'House', label: 'House' },
        { value: 'Garage', label: 'Garage' },
        { value: 'Office', label: 'Office' },
    ]

    return (
        <Select options={types} {...props} />
    )
};

export default TypeSelect;