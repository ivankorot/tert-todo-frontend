import React, {useState} from "react";
import './index.css';
import logo from './img/group.svg'
import deleteIcon from './img/delete-icon.svg'
import {Link, useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {useMutation, useQuery} from "@apollo/client";
import {message as antdMessage} from "antd";
import {fieldNames} from "./enumerations";
import {CREATE_TODO_ITEM, DELETE_TODO_ITEM, TODO_ITEMS_LIST} from "./gql";
import {TOGGLE_TODO} from "../ToDo/gql";

interface ToDoItem {
    text: String
    id: number
    isComplete: boolean
}

const ToDoItems: React.FC = () => {
    const { id: todoID } = useParams()
    const { handleSubmit, formState: { errors }, control } = useForm({
        mode: 'onChange',
    });
    const [filter, setFilter] = useState<String>('all')
    const [createToDo] = useMutation(CREATE_TODO_ITEM);
    const { error,data: todoListResponse, refetch } = useQuery(TODO_ITEMS_LIST, {
        variables: {
            filter,
            id: Number(todoID)
        }
    });
    const [deleteToDo] = useMutation(DELETE_TODO_ITEM);
    const [toggleToDo] = useMutation(TOGGLE_TODO);

    React.useEffect(() => {
        if (error) {
            antdMessage.error(error.message,1);
        }
    }, [error]);

    React.useEffect(() => {
        (async () => {
            await refetch();
        })();
    }, [filter])

    const onFormSubmit = async (values: any) => {
        const { title } = values;
        const response = await createToDo({
            variables: {
                id: Number(todoID),
                title
            },
        });
        if (response) {
            await refetch()
        }
    };

    const onChangeFilter = async (filterVal: String) => {
        setFilter(filterVal)
    }

    const onTodoItemDelete = async (id: number) => {
        const response = await deleteToDo({
            variables: {
                id
            },
        });
        if (response) {
            await refetch()
        }
    };

    const onTodoItemToggle = async (isCompleted: Boolean, id: number) => {
        const response = await toggleToDo({
            variables: {
                isCompleted,
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
                    Todo List
                </span>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Controller
                        name={fieldNames.title}
                        control={control}
                        render={({field: {onChange}})=>(<input type="text" onChange={onChange} placeholder="ToDo" className="Add-a-new-todo"/>)}
                    />
                    {todoListResponse && todoListResponse.getToDoItems && todoListResponse.getToDoItems.map((value: ToDoItem) => (
                        <div className="Todo-Item-Wrapper" key={value.id}>
                            <div>
                                <input type="checkbox"
                                       onChange={(event) => onTodoItemToggle(event.target.checked, value.id)}
                                       checked={value.isComplete}/>
                                <span className="Make-a-todo-list">
                                    {value.text}
                                </span>
                            </div>
                            <img src={deleteIcon} onClick={() => onTodoItemDelete(value.id)} placeholder="ToDo"
                                 className="Path-Copy"/>
                        </div>
                    ))}
                </form>
                <div className="Filter-Wrapper">
                    Show:
                    <div className='Filter' onClick={()=>{onChangeFilter("all")}} style={{color: filter === 'all' ? "blue" : "black"}}>
                        All
                    </div>
                    <div className='Filter' onClick={()=>{onChangeFilter("completed")}} style={{color: filter === 'completed' ? "blue" : "black"}}>
                        Completed
                    </div>
                    <div className='Filter' onClick={()=>{onChangeFilter("incompleted")}} style={{color: filter === 'incompleted' ? "blue" : "black"}}>
                        Incompleted
                    </div>
                </div>
                <Link to={'/todo'} className="Back-Button">Back to ToDos</Link>
            </div>
        </div>
    );
};

export default ToDoItems;