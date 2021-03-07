import {getCourses} from "../services/coursesService";

export const getAllCourses = () => {
    return async (dispatch) => {
        const {data} = await getCourses()


      await dispatch({type:"INIT",payload:data.courses})
    }
}