import {getCourses, newCourse, updateCoursee} from "../services/coursesService";
import {successMessage} from "../utils/message";


export const getAllCourses = () => {
    return async (dispatch) => {
        const {data} = await getCourses()
        await dispatch({type: "INIT", payload: data.courses})
    }
}
export const createNewCourse = (course) => {
    return async (dispatch, getState) => {
        const {data, status} = await newCourse(course);
        if (status === 201) successMessage("دوره با موفقیت ساخته شد");
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses, data.course],
        });
    };
}
export const handleCourseUpdate = (courseId, updateCourse) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses]
        const updateCourses = [...courses]
        const courseIndex = updateCourses.findIndex(course => course._id === courseId)
        let course = updateCourses[courseIndex]
        course = [...Object.fromEntries(updateCourse)]
        updateCourses[courseIndex] = course
         try {
             await dispatch({type: "UPDATE_COURSE", payload: [...updateCourses]})
            const {data, status} = await updateCoursee(courseId, updateCourse)
            if (status === 200) {
                successMessage("کازربر با موفقیت تغییر یافت ")

            }

        } catch (ex) {
            await dispatch({type: "UPDATE_COURSE", payload: [...courses]})

        }
    }

}
export const handleCourseDelete=(courseId)=>{


}

