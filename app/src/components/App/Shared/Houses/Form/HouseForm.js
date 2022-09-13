import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { HouseRoutes } from "../../../../../core/routing";
import Button from "../../../../Design/Buttons/Button";
import FileInput from "../../../../Design/Form/FileInput";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import StateSelect from "../Select/StateSelect";
import TypeSelect from "../Select/TypeSelect";

const schema = yup.object().shape({
    surfaceArea: yup.number().required(),
    type: yup.string().required(),
    state: yup.string().required(),
    constructionYear: yup.number().required(),
    street: yup.string().required(),
    town: yup.string().required(),
    price: yup.number().required(),
    image: yup.string().required(),
});

const HouseForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        surfaceArea: "",
        type: "",
        state: "",
        constructionYear: "",
        street: "",
        town: "",
        price: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    }

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            {!location.pathname.includes('/edit')
                && <FormGroup>
                    <Label htmlFor="image">{t("houses.fields.image")}</Label>
                    <FileInput
                        name="image"
                        value={values.image}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.image}
                    />
                </FormGroup>
            }
            <FormGroup>
                <Label htmlFor="town">{t("houses.fields.town")}</Label>
                <Input
                    name="town"
                    value={values.town}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.town}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="street">{t("houses.fields.streetAndNumber")}</Label>
                <Input
                    name="street"
                    value={values.street}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.street}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="state">{t("houses.fields.state")}</Label>
                <StateSelect
                    name="state"
                    value={values.state}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.state}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="type">{t("houses.fields.type")}</Label>
                <TypeSelect
                    name="type"
                    value={values.type}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.type}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="surfaceArea">{t("houses.fields.surfaceArea")}</Label>
                <Input
                    name="surfaceArea"
                    value={values.surfaceArea}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.surfaceArea}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="constructionYear">{t("houses.fields.constructionYear")}</Label>
                <Input
                    name="constructionYear"
                    value={values.constructionYear}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.constructionYear}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price">{t("houses.fields.price")}</Label>
                <Input
                    name="price"
                    value={values.price}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.price}
                />
            </FormGroup>
            <Button color="primary" type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );

}

export default HouseForm;