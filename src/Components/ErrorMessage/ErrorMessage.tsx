import React from 'react';

interface IErrorMessage {
    errors: any;
    name: string;
}

const ErrorMessage = ({ errors, name }: IErrorMessage) => {
    // Note: if you are using FormContext, then you can use Errors without props eg:
    // const { errors } = useFormContext();
    if (!errors[name]) return null;

    return <div>{errors[name].message}</div>;
};

export default ErrorMessage;