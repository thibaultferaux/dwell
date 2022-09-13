import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";

// dynamic schema
const getSchema = (isUpdate) => {
    return yup.object().shape({
        name: yup.string().required(),
        surname: yup.string().required(),
        email: yup.string().email().required(),
        password: isUpdate ? yup.string() : yup.string().required(),
    });
}

const transformValues = (values) => {
    // don't send password if it's empty
    if (values.password.length === 0) {
        const { password, ...rest } = values; // or use "delete" keyword
        values = rest;
    }
    return values;
};

// random password generator
const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "";
    for (let x = 0; x < 10; x++) {
        let i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
};

const UserForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const isUpdate = !!initialData.id;
    const { values, errors, handleChange, handleSubmit } = useForm(
        getSchema(isUpdate),
        {
            name: "",
            surname: "",
            email: "",
            password: "",
            ...initialData,
        }
    );

    const handleGeneratePassword = (e) => {
        values.password = generatePassword();
        handleChange(e);
    }

    const handleData = (values) => {
        onSubmit(transformValues(values));
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                    name="name"
                    value={values.name}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="surname">{t("fields.surname")}</Label>
                <Input
                    name="surname"
                    value={values.surname}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.surname}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    value={values.email}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.email}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">{t("fields.password")}</Label>
                <div className="flex gap-4 whitespace-nowrap">
                    <Input
                        name="password"
                        value={values.password}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <Button color="secondary" className="text-sm" onClick={handleGeneratePassword}>
                        {t("buttons.generatePassword")}
                    </Button>
                </div>
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default UserForm;
