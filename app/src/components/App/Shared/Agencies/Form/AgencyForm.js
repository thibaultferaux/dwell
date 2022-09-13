import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";

const schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required(),
    phonenumber: yup.number().required(),
});

const AgencyForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        address: "",
        email: "",
        phonenumber: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="name">{t("agencies.fields.name")}</Label>
                <Input
                    name="name"
                    value={values.name}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address">{t("agencies.fields.address")}</Label>
                <Input
                    name="address"
                    value={values.address}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.address}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("agencies.fields.email")}</Label>
                <Input
                    name="email"
                    value={values.email}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.email}
                    type="email"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phonenumber">{t("agencies.fields.phonenumber")}</Label>
                <Input
                    name="phonenumber"
                    value={values.phonenumber}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.phonenumber}
                />
            </FormGroup>
            <Button color="primary" type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
}

export default AgencyForm;