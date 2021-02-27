import React, {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";


const Register = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const Reset = () => {

        setFullName("")
        setEmail("")
        setPassword("")
    }


    const handleForm = (event) => {
        event.preventDefault()
        const user = {
            fullName,
            email,
            password
        }
        // axios.post("https://toplearnapi.ghorbany.dev/api/register",
        //     JSON.stringify(user),
        //     {
        //         headers: {"Content-Type": "application/JSON"}
        //
        //     }
        // )
        //     .then(reponse => {
        //         console.log(reponse)
        //
        //
        //         Reset()
        //     }).catch(ex => {
        //     console.log(ex)
        // })

        axios
            .post(
                "https://toplearnapi.ghorbany.dev/api/register",
                JSON.stringify(user),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(({data, status}) => {
                if (status === 201) {
                    toast.success("کاربر با موفقیت ساخته شد.", {
                        position: "top-right",
                        closeOnClick: true
                    });
                    console.log(data);
                    Reset();
                }
            })
            .catch(ex => {
                toast.error("مشکلی پیش آمده.", {
                    position: "top-right",
                    closeOnClick: true
                });
                console.log(ex);
            });


    }

    return (

        <main className="client-page">
            <div className="container-content">

                <header><h2> عضویت در سایت </h2></header>

                <div className="form-layer">

                    <form onSubmit={handleForm}>

                        <div className="input-group">
                            <span className="input-group-addon" id="username"><i
                                className="zmdi zmdi-account"/></span>
                            <input type="text" className="form-control" placeholder="نام و نام خانوادگی"
                                   aria-describedby="username" value={fullName}
                                   onChange={event => setFullName(event.target.value)}/>
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="email-address"><i
                                className="zmdi zmdi-email"/>></span>
                            <input type="text" className="form-control" placeholder="ایمیل"
                                   aria-describedby="email-address" value={email}
                                   onChange={event => setEmail(event.target.value)}/>
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                            <input type="text" className="form-control" placeholder="رمز عبور "
                                   aria-describedby="password" value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                        </div>

                        <div className="accept-rules">
                            <label><input type="checkbox" name=""/> قوانین و مقررات سایت را میپذیرم </label>
                        </div>

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> ورود به سایت </a>
                        </div>

                        <button className="btn btn-success"> عضویت در سایت</button>

                    </form>
                </div>

            </div>
        </main>


    )
}
export default Register