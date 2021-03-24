import {getCourses, newCourse} from "../services/coursesService";
import {successMessage} from "../utils/message";

export const getAllCourses = () => {
    return async (dispatch) => {
        const {data} = await getCourses()
      await dispatch({type:"INIT",payload:data.courses})
    }
}
export const createNewCourse=(course)=>{
    return async (dispatch, getState) => {
        const { data, status } = await newCourse(course);
        if (status === 201) successMessage("دوره با موفقیت ساخته شد");
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses,data.course],
        });
    };
}

