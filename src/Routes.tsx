import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ToDo from "./Pages/ToDo/ToDo";
import ToDoItems from "./Pages/ToDoItems/ToDoItems";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import LoginPage from "./Pages/Login/Login";

const RoutesList = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/todo' element={<PrivateRoute>
                <ToDo/>
            </PrivateRoute>}/>
            <Route path='/todo-items/:id' element={<PrivateRoute>
                <ToDoItems/>
            </PrivateRoute>}/>
        </Routes>
    </BrowserRouter>
)

export default RoutesList