import React from "react";
import {NavLink} from "react-router-dom";
import {isEmpty} from "lodash"
import {useSelector} from "react-redux";

const TopNavs = () => {
    const user = useSelector(state => state.user)
    console.log(user)


    return (


        <nav>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <ul>
                        <li>
                            <NavLink to="/" exact activeStyle={{color: "Lime"}}> صفحه اصلی </NavLink>
                            <a href=""> درباره ما </a>
                            <a href=""> تماس با ما </a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="clientarea">
                        {!isEmpty(user) ? (
                            <div className="loggein ">
                                <i className="zmdi zmdi-account"/>
                                <NavLink to="/profile">{user.fullname} / </NavLink>
                                <NavLink to="/logout">خروج</NavLink>
                            </div>

                        ) : (

                            <div className="signin ">
                                <i className="zmdi zmdi-account"/>
                                <NavLink to="/login" activeStyle={{color: "Lime"}}> ورود </NavLink> /
                                <NavLink to="/register" activeStyle={{color: "Lime"}}> عضویت </NavLink>
                            </div>
                        )}
                        {/*<div className="signin ">*/}
                        {/*    <i className="zmdi zmdi-account"/>*/}
                        {/*    <NavLink to="/login" activeStyle={{color: "Lime"}}> ورود </NavLink> /*/}
                        {/*    <NavLink to="/register" activeStyle={{color: "Lime"}}> عضویت </NavLink>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default TopNavs