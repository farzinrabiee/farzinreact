import {combineReducers} from "redux";
import {coursesReducers} from "./courses";
import {courseReducers} from "./course";
import {userReducers} from "./user";
import {loadingBarReducer} from "react-redux-loading-bar";

export const reducers = combineReducers({

        courses: coursesReducers,
        course: courseReducers,
        user: userReducers,
        loadingBar: loadingBarReducer
    }
)
