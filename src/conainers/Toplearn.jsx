import React,{useEffect} from "react";
import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import {Route, Switch} from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/Register/Register";
import Archive from "../components/Course/Archive";
import UserProfile from "../components/Profile/UserProfile";
import SingleCourse from "../components/Course/SingleCourse";
import {useDispatch, useSelector} from "react-redux";
import {paginate} from "../utils/paginate";
import jwt from "jsonwebtoken"
import {addUser} from "../actions/user";
import {decodeToken} from "../utils/decodeToken";

const Toplearn = () => {

    const courses=useSelector(state=>state.courses)
    const indexCourse=paginate(courses,1,8)
    const dispatch=useDispatch()

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if (token){
            const decodeTokenn=decodeToken(token)
            const dateNow=Date.now()
            if (decodeTokenn.payload.ext<dateNow){
                localStorage.removeItem("token")
            }else {
                dispatch(addUser(decodeTokenn.payload.user))

            }
        }
    },[])



    return (
        <MainLayout>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/archive" component={Archive}/>
                <Route path="/course/:id" component={SingleCourse}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/" exact render={()=><Course courses={indexCourse}/> }/>
            </Switch>
        </MainLayout>
    );
};
export default Toplearn;
