import useForm from "../../../../core/hooks/useForm";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import { useAuthContext } from "../AuthProvider";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthRoutes, route } from "../../../../core/routing";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const defaultData = {
    email: "",
    password: "",
};

const LoginScreen = () => {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const { isLoading, error, mutate } = useMutation();

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            data: values,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    return (
        <div className="w-full h-screen relative flex justify-center items-center grow-0">
            <img src="/hero.png" alt="hero" className="absolute w-full h-full object-cover object-center -z-10" />
            <div className="w-4/5 bg-white md:w-2/3 lg:w-2/5 rounded-xl px-10 py-12">
                <div className="text-center flex items-center flex-col">
                    <img width="130" src="/logo-color.png" alt="logo" />
                    <h1 className="mt-6 text-gray-900 text-2xl font-bold">{t("onboarding.login.title")}</h1>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleData)} noValidate={true}>
                    {error && <Alert color="danger">{error}</Alert>}
                    <FormGroup>
                        <Label htmlFor="email">{t("fields.email")}</Label>
                        <Input
                            name="email"
                            value={values.email}
                            error={errors.email}
                            disabled={isLoading}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">{t("fields.password")}</Label>
                        <Input
                            name="password"
                            type="password"
                            value={values.password}
                            error={errors.password}
                            disabled={isLoading}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" className="w-full" disabled={isLoading}>
                        {t("onboarding.login.button")}
                    </Button>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t("onboarding.login.account")}
                        <Link to={route(AuthRoutes.Register)} className="font-medium text-indigo-600 hover:text-indigo-500"> {t("onboarding.login.link")} </Link>
                    </p>
                </form>
            </div>
        </div >
    );
};

export default LoginScreen;
