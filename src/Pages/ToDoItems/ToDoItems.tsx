import React from "react";
import Logout from "../../Components/Logout/Logout";
import ToDoItems from "../../Components/ToDoItems/ToDoItems";


const ToDoItemsPage: React.FC = () => {


    return (
        <React.Fragment>
            <Logout/>
            <ToDoItems/>
        </React.Fragment>
    );
};

export default ToDoItemsPage;