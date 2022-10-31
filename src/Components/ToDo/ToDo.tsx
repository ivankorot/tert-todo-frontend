import React from "react";
import './index.css';
import logo from './img/group.svg'
import deleteIcon from './img/delete-icon.svg'
import {Controller, useForm} from "react-hook-form";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_TODO, DELETE_TODO, TODO_LIST} from "../../Components/ToDo/gql";
import {message as antdMessage} from "antd";
import {fieldNames} from "./enumerations";
import {Link} from "react-router-dom";

interface ToDo {
    name: String
    id: number
}

const ToDo: React.FC = () => {
    const { handleSubmit, formState: { errors }, control } = useForm({
        mode: 'onChange',
    });

    const [createToDo, { data: responseData }] = useMutation(CREATE_TODO);
    const { error,data: todoListResponse, refetch } = useQuery(TODO_LIST);
    const [deleteToDo, { data: deleteData }] = useMutation(DELETE_TODO);

    React.useEffect(() => {
        if (error) {
            antdMessage.error(error.message,1);
        }
    }, [error]);

    const onFormSubmit = async (values: any) => {
        const { text } = values;
        const response = await createToDo({
            variables: {
                text
            },
        });
        if (response) {
            await refetch()
        }
    };

    const onTodoDelete = async (id: number) => {
        const response = await deleteToDo({
            variables: {
                id
            },
        });
        if (response) {
            await refetch()
        }
    };

    return (
        <div className="Rectangle-Wrapper">
            <div className="Rectangle">
                <img src={logo}
                     className="Group"/>
                <span className="Todo-List Text-Style">
                            Todo Group
                        </span>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Controller
                        name={fieldNames.text}
                        control={control}
                        render={({field: {onChange}})=>(<input type="text" onChange={onChange} placeholder="ToDo" className="Add-a-new-todo"/>)}
                    />
                    {todoListResponse && todoListResponse.listToDos && todoListResponse.listToDos.map((value: ToDo) => (
                        <div className="Todo-Item-Wrapper" key={value.id}>
                            <Link to={`/todo-items/${value.id}`}>
                                    <span className="Make-a-todo-list">
                                        {value.name}
                                    </span>
                            </Link>
                            <img src={deleteIcon} onClick={() => onTodoDelete(value.id)} placeholder="ToDo" className="Path-Copy"/>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default ToDo;