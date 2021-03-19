import React,{useContext} from "react"
import {withRouter} from "react-router";
import {Helmet} from "react-helmet";
import {context} from "../context/Context";

const Login = () => {
    const loginContext=useContext(context)
const {handleLogin,email,setEmail,validator,password,setPassword}=loginContext
    return (
        <main className="client-page">
            <div className="container-content">

                <header><h2> ورود به سایت </h2></header>
                <Helmet>
                    <title>ورود در سایت</title>
                </Helmet>

                {/*<Sugar customLoading={loading} time={0}/>*/}
                <div className="form-layer">

                    <form onSubmit={e=>handleLogin(e)}>

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
                            <input type="password" className="form-control" placeholder="رمز عبور "
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