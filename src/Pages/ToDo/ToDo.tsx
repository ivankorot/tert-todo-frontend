import React from "react";
import Logout from "../../Components/Logout/Logout";
import ToDo from "../../Components/ToDo/ToDo";


const ToDoPage: React.FC = () => {


    return (
        <React.Fragment>
            <Logout/>
            <ToDo/>
        </React.Fragment>
    );
};

export default ToDoPage;