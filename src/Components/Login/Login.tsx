import React from 'react';
import { useMutation } from '@apollo/client';
import { Input, Button, message as antdMessage } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { fieldNames } from './enumerations';
import { LOGIN } from './gql';
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage';
import useAuthUser from '../../hooks/useAuthUser';
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
    const navigation = useNavigate()
    const { setAuthUser } = useAuthUser();
    const { handleSubmit, formState: { errors }, control } = useForm({
        mode: 'onChange',
    });

    const [login, { loading: isLoading, error, data: loginData }] = useMutation(LOGIN);

    React.useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigation('/todo')
        }
    },[navigation])

    React.useEffect(() => {
        if (loginData) {
        }
    }, [loginData]);

    React.useEffect(() => {
        if (error) {
            antdMessage.error(error.message,1);
        }
    }, [error]);

    const onFormSubmit = async (values: any) => {
        const { userName, password } = values;
        const response = await login({
            variables: {
                username: userName,
                password,
            },
        });
        if (response) {
            const token = response.data.login;
            if (token) {
                setAuthUser(token);
                navigation('/todo')
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
                <Controller
                    name={fieldNames.userName}
                    control={control}
                    render={({field: {value, onChange}})=>(<Input onChange={onChange} placeholder="Username" value={value}/>)}
                />
                <ErrorMessage errors={errors} name={fieldNames.userName} />
                <Controller
                    name={fieldNames.password}
                    control={control}
                    render={({field: {value, onChange}})=>(<Input value={value} onChange={onChange} type="password" placeholder="Password" />)}
                />
                <ErrorMessage errors={errors} name={fieldNames.password} />
                <Button block type="primary" htmlType="submit" loading={isLoading}>
                    Log in
                </Button>
        </form>
    );
};

export default LoginForm;