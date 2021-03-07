import {combineReducers} from "redux";
import {coursesReducers} from "./courses";
import {courseReducers} from "./course";
import {userReducers} from "./user";

export const reducers = combineReducers({

        courses: coursesReducers,
        course: courseReducers,
        user: userReducers
    }
)
