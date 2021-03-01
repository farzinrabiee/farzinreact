import React, {useRef, useState} from "react"
import SimpleReactValidator from "simple-react-validator";
import {Sugar} from "react-preloaders"
import {loginUser} from "../../services/userService";
import {withRouter} from "react-router";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";


const Login = ({history}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [, forceUpdate] = useState()
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
        setEmail("")
        setPassword("")
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const user = {
            email,
            password
        }
        reset()


        try {
            if (validator.current.allValid()) {
                setLoading(true)
                const {status, data} = await loginUser(user)
                if (status === 200) {
                    toast.success("کاربر وارد شد ", {
                        position: "top-right",
                        closeOnClick: true

                    })


                    localStorage.setItem("token",data.token)
                    setLoading(false)
                    history.replace("/")
                    setLoading(false)

                    reset()
                }
            } else {

                validator.current.showMessages()
                forceUpdate(1)

            }


        } catch (ex) {
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true
            });
            setLoading(false)

        }


    }

    return (
        <main className="client-page">
            <div className="container-content">

                <header><h2> ورود به سایت </h2></header>
                <Helmet>
                    <title>ورود در سایت</title>
                </Helmet>

                {loading?(<Sugar customLoading={loading} time={0}/>):null}
                <div className="form-layer">

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <span className="input-group-addon" id="email-address">
                                <i className="zmdi zmdi-email"></i></span>
                            <input name="email" type="text" className="form-control" placeholder="ایمیل"
                                   aria-describedby="email-address" value={email} onChange={e => {
                                setEmail(e.target.value);
                                validator.current.showMessageFor("email")
                            }}/>
                            {validator.current.message("email", email, "required|email")}

                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                            <input  type="password" className="form-control" placeholder="رمز عبور "
                                   aria-describedby="password" name="password" value={password} onChange={e => {
                                setPassword(e.target.value)
                                validator.current.showMessageFor("password")
                            }}/>
                            {validator.current.message("password", password, "required|min:5")}
                        </div>

                        <div className="remember-me">
                            <label><input type="checkbox" name=""/> مرا بخاطر بسپار </label>
                        </div>

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده ام !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> عضویت در سایت </a>
                        </div>

                        <button className="btn btn-success"> ورود به سایت</button>

                    </form>
                </div>

            </div>
        </main>

    )
}
export default withRouter(Login)