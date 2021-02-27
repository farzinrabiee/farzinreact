import React from "react";
import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import {Route, Switch} from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/Register/Register";
import Archive from "../components/Course/Archive";
import UserProfile from "../components/Profile/UserProfile";
import SingleCourse from "../components/Course/SingleCourse";


const Toplearn = () => {
    return (
        <MainLayout>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/archive" component={Archive}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/single" component={SingleCourse}/>
                <Route path="/" exact component={Course}/>
            </Switch>
        </MainLayout>
    );
};
export default Toplearn;