import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setformValidaton] = useState({});

    useEffect(() => {
        createValidator();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState]);

    // si el initialForm cambia, actualizar el form
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    // evaluamos si existe cambios en el formState
    const isFormValid = useMemo(() => {
        // iteramos cada propiedad del formValidation
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false; // --> evaluamos si algun campo no es valido
        }

        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidator = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setformValidaton(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    };
};
