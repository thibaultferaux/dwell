import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const StateSelect = (props) => {
    const { t } = useTranslation()

    const states = [
        { value: "for-sale", label: t('house.for-sale') },
        { value: "for-rent", label: t('house.for-rent') },
    ]

    return <Select options={states} {...props} />;
};

export default StateSelect;