import React, {useEffect} from "react";
import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import {Route, Switch} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Archive from "../components/Course/Archive";
import UserProfile from "../components/Profile/UserProfile";
import SingleCourse from "../components/Course/SingleCourse";
import {useDispatch, useSelector} from "react-redux";
import {paginate} from "../utils/paginate";
import jwt from "jsonwebtoken"
import {addUser, clearUser} from "../actions/user";
import {decodeToken} from "../utils/decodeToken";
import {Logout} from "../components/Login/LogOut";
import {isEmpty} from "lodash"
import {Redirect} from "react-router";

const Toplearn = () => {

    const courses = useSelector(state => state.courses)
    const user=useSelector(state=>state.user)
    const indexCourse = paginate(courses, 1, 8)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decodeTokenn = decodeToken(token)
            const dateNow = Date.now() / 1000
            if (decodeTokenn.payload.ext < dateNow) {
                localStorage.removeItem("token")
                dispatch(clearUser())
            } else {
                dispatch(addUser(decodeTokenn.payload.user))
            }
        }
    },[])


    return (
        <MainLayout>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/logout" render={()=>isEmpty(user)?<Redirect to="/"/>: <Logout/>}/>
                <Route path="/register" component={Register}/>
                <Route path="/archive" component={Archive}/>
                <Route path="/course/:id" component={SingleCourse}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/" exact render={() => <Course courses={indexCourse}/>}/>
            </Switch>
        </MainLayout>
    );
};
export default Toplearn;
