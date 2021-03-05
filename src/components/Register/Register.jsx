// import React, {useState} from "react";
// import axios from "axios";
// import {toast} from "react-toastify";
//
//
// const Register = () => {
//
//     const [fullName, setFullName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const Reset = () => {
//
//         setFullName("")
//         setEmail("")
//         setPassword("")
//     }
//
//
//     const handleForm = (event) => {
//         event.preventDefault()
//         const user = {
//             fullName,
//             email,
//             password
//         }
//         // axios.post("https://toplearnapi.ghorbany.dev/api/register",
//         //     JSON.stringify(user),
//         //     {
//         //         headers: {"Content-Type": "application/JSON"}
//         //
//         //     }
//         // )
//         //     .then(reponse => {
//         //         console.log(reponse)
//         //
//         //
//         //         Reset()
//         //     }).catch(ex => {
//         //     console.log(ex)
//         // })
//         console.log(JSON.stringify(user))
//
//         axios
//             .post(
//                 "https://toplearnapi.ghorbany.dev/api/register",
//                 JSON.stringify(user),
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }
//
//             )
//             .then(({data, status}) => {
//                 if (status === 201) {
//                     toast.success("کاربر با موفقیت ساخته شد.", {
//                         position: "top-right",
//                         closeOnClick: true
//                     });
//                     console.log(data);
//                     Reset();
//                 }
//             })
//             .catch(ex => {
//                 toast.error("مشکلی پیش آمده.", {
//                     position: "top-right",
//                     closeOnClick: true
//                 });
//                 console.log(ex);
//             });
//
//

//     }
//
//     return (
//
//         <main className="client-page">
//             <div className="container-content">
//
//                 <header><h2> عضویت در سایت </h2></header>
//
//                 <div className="form-layer">
//
//                     <form onSubmit={handleForm}>
//
//                         <div className="input-group">
//                             <span className="input-group-addon" id="username"><i
//                                 className="zmdi zmdi-account"/></span>
//                             <input type="text" className="form-control" placeholder="نام و نام خانوادگی"
//                                    aria-describedby="username" value={fullName}
//                                    onChange={event => setFullName(event.target.value)}/>
//                         </div>
//
//                         <div className="input-group">
//                             <span className="input-group-addon" id="email-address"><i
//                                 className="zmdi zmdi-email"/>></span>
//                             <input type="text" className="form-control" placeholder="ایمیل"
//                                    aria-describedby="email-address" value={email}
//                                    onChange={event => setEmail(event.target.value)}/>
//                         </div>
//
//                         <div className="input-group">
//                             <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
//                             <input type="text" className="form-control" placeholder="رمز عبور "
//                                    aria-describedby="password" value={password}
//                                    onChange={event => setPassword(event.target.value)}/>
//                         </div>
//
//                         <div className="accept-rules">
//                             <label><input type="checkbox" name=""/> قوانین و مقررات سایت را میپذیرم </label>
//                         </div>
//
//                         <div className="link">
//                             <a href=""> <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !</a>
//                             <a href=""> <i className="zmdi zmdi-account"></i> ورود به سایت </a>
//                         </div>
//
//                         <button className="btn btn-success"> عضویت در سایت</button>
//
//                     </form>
//                 </div>
//
//             </div>
//         </main>
//
//
//     )
// }
// export default Register


import React, {useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import {Sugar} from "react-preloaders"
import {toast} from "react-toastify";
import {registerUser} from "../../services/userService";
import {Helmet} from "react-helmet";

const Register = ({history}) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, forceUpdate] = useState()
    const [policy, setPolicy] = useState("")

    const [loading,setLoading]=useState(false)
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزمی است",
            min: "حداقل ۵ حرف باشد",
            email: "ایمیل نوشته شده اشتباه است "
        },
        element: message => <div style={{color: "red"}}>{message}</div>
    }))

    const reset = () => {
        setFullname("");
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const user = {
            fullname,
            email,
            password
        };


        try {
            if (validator.current.allValid()) {
                setLoading(true)
                const {status} = await registerUser(user);
                if (status === 201) {
                    toast.success("کاربر با موفقیت ساخته شد.", {
                        position: "top-right",
                        closeOnClick: true
                    });
                    setLoading(false)
                    history.push("/login")

                    reset();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);

            }
        } catch (ex) {
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true
            });
            console.log(ex);
            setLoading(false)
        }
    };


    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> عضویت در سایت </h2>
                </header>
                <Helmet>
                    <title>عضویت در سایت</title>
                </Helmet>

                {loading?(<Sugar customLoading={loading} time={0}/>):null}
                <div className="form-layer">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="input-group-addon" id="username">
                                <i className="zmdi zmdi-account"></i>
                            </span>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                placeholder="نام و نام خانوادگی"
                                aria-describedby="username"
                                value={fullname}
                                onChange={e => {
                                    setFullname(e.target.value);
                                    validator.current.showMessageFor("fullname")
                                }}
                            />
                            {validator.current.message("fullname", fullname, "required|min:5")}

                        </div>

                        <div className="input-group">
                            <span
                                className="input-group-addon"
                                id="email-address"
                            >
                                <i className="zmdi zmdi-email"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="ایمیل"
                                aria-describedby="email-address"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validator.current.showMessageFor("email")
                                }}

                            />
                            {validator.current.message("email", email, "required|email")}
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password">
                                <i className="zmdi zmdi-lock"></i>
                            </span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    validator.current.showMessageFor("password")
                                }}
                            />
                            {validator.current.message("password", password, "required|min:5")}
                        </div>

                        <div className="accept-rules">
                            <label>
                                <input type="checkbox" name="policy" value={policy} onChange={e => {
                                    setPolicy(e.currentTarget.checked)
                                    validator.current.showMessageFor("policy")
                                }}/>
                                {validator.current.message("policy", policy, "required")}
                                قوانین و
                                مقررات سایت را میپذیرم{" "}
                            </label>
                        </div>

                        <div className="link">
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-assignment"></i> قوانین
                                و مقررات سایت !
                            </a>
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-account"></i> ورود به
                                سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                            عضویت در سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;
