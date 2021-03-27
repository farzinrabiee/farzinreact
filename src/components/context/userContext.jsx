// import React, {useRef, useState} from "react"
// import Context from "react-redux/lib/components/Context";
// import {withRouter} from "react-router-dom"
// import SimpleReactValidator from "simple-react-validator";
// import {loginUser, registerUser} from "../../services/userService";
// import {errorMessage, successMessage} from "../../utils/message";
//
//
//  const UserContext = ({children,history}) => {
//     const [fullname, setFullname] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [, forceUpdate] = useState()
//     const [policy, setPolicy] = useState("")
//
//
//     const validator = useRef(new SimpleReactValidator({
//         messages: {
//             required: "پر کردن این فیلد الزمی است",
//             min: "حداقل ۵ حرف باشد",
//             email: "ایمیل نوشته شده اشتباه است "
//         },
//         element: message => <div style={{color: "red"}}>{message}</div>
//     }))
//     const  = () => {
//         setFullname("");
//         setEmail("");
//         setPassword("");
//         setPolicy("")
//     };
//
//     const handleLogin = async (event) => {
//         event.preventDefault()
//         const user = {
//             email,
//             password
//         }
//
//
//         try {
//             if (validator.current.allValid()) {
//                 const {status, data} = await loginUser(user)
//                 if (status === 200) {
//                  successMessage("کاربر با موفقیت ساخته شد ")
//                     localStorage.setItem("token",data.token)
//                     // dispatch(addUser(decodeToken(data.token).payload.user))
//                     history.replace("/")
//                     ()
//                 }
//             } else {
//                 validator.current.showMessages()
//                 forceUpdate(1)
//             }
//
//
//         } catch (ex) {
//           errorMessage("مشکلی پیش مده است ")
//
//         }
//
//
//     }
//
//
//
//     const handleRegister = async event => {
//         event.preventDefault();
//         const user = {
//             fullname,
//             email,
//             password
//         };
//
//
//         try {
//             if (validator.current.allValid()) {
//                 const {status} = await registerUser(user);
//                 if (status === 201) {
//                     successMessage("کاربر با موفقیت وارد شد ")
//                     history.push("/Login")
//
//                     ();
//                 }
//             } else {
//                 validator.current.showMessages();
//                 forceUpdate(1);
//
//             }
//         } catch (ex) {
//             errorMessage("مشکلی پیش مده است ")
//         }
//     };
//
//
//     return (
//         <Context.provider value={{
//             fullname,
//             setFullname,
//             email,
//             setEmail,
//             password,
//             setPassword,
//             policy,
//             setPolicy,
//             validator,
//             handleLogin,
//             handleRegister,
//         }
//
//
//         }>
//             {children}
//
//
//         </Context.provider>
//
//
//     )
//
//
//  }
//  export default withRouter(UserContext)
import React, { useState, useRef,useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { context } from "./Context";
import { successMessage, errorMessage } from "./../../utils/message";
import { loginUser, registerUser } from "../../services/userService";
import { decodeToken } from "./../../utils/decodeToken";
import { withRouter } from "react-router";
import { addUser } from "./../../actions/user";
import {hideLoading, showLoading} from "react-redux-loading-bar";

const UserContext = ({ children, history }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [policy, setPolicy] = useState();

    const [, forceUpdate] = useState();

    const dispatch = useDispatch();


    useEffect(() => {
        return () => {
            setFullname();
            setEmail();
            setPassword();
            setPolicy();
        };
    }, []);


    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد"
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );

   
    const handleLogin = async event => {
        event.preventDefault();
        const user = { email, password };
        try {
            if (validator.current.allValid()) {
                dispatch(showLoading())
                const { status, data } = await loginUser(user);
                if (status === 200) {
                    successMessage("ورود موفقیت آمیز بود.");
                    localStorage.setItem("token", data.token);
                    dispatch(addUser(decodeToken(data.token).payload.user));
                    dispatch(hideLoading())
                    history.replace("/");

                }
            } else {
                validator.current.showMessages();

                forceUpdate(1);
            }
        } catch (ex) {
            console.log(ex);
            errorMessage("مشکلی پیش آمده.");
            dispatch(hideLoading())
        }
    };

    const handleRegister = async event => {
        event.preventDefault();
        const user = {
            fullname,
            email,
            password
        };

        try {
            if (validator.current.allValid()) {
                dispatch(showLoading())
                const { status } = await registerUser(user);

                if (status === 201) {
                    successMessage("کاربر با موفقیت ساخته شد.");
                    history.push("/login");
                    dispatch(hideLoading())
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            errorMessage("مشکلی در ثبت نام پیش آمده.");
            console.log(ex);
            dispatch(hideLoading())
        }
    };

    return (
        <context.Provider
            value={{
                fullname,
                setFullname,
                email,
                setEmail,
                password,
                setPassword,
                policy,
                setPolicy,
                validator,
                handleLogin,
                handleRegister
            }}
        >
            {children}
        </context.Provider>
    );
};

export default withRouter(UserContext);
