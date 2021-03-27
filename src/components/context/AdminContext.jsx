import React, {useState,useEffect,useRef} from "react";
import {orderBy} from "lodash"
import {DashContext} from "./DashContext";
import {paginate} from "../../utils/paginate";
import NewCourseDialog from "../admin/dialogs/NewCourseDialog";
import {EditCourseDialog} from "../admin/dialogs/EditCourseDialog";
import DeleteCourseDialog from "../admin/DeleteCourseDialog";
import SimpleReactValidator from "simple-react-validator";


export const AdminContext = ({courses, children}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(2);
    const [currentCourse, setCurrentCourse] = useState({})
    const [newCourseDialog, setNewCourseDialog] = useState(false)
    const [editCourseDialog, setEditCourseDialog] = useState(false)
    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
    const [courseList, setCourseList] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {

        setCourseList(courses)
    }, [courses]);


    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                integer:"قیمت باید به عدد باشد"
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );


    const openNewCourseDialog = () => setNewCourseDialog(true)
    const closeNewCourseDialog = () => setNewCourseDialog(false)


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const openEditCourseDialog = (course) => {
        setEditCourseDialog(true)
        setCurrentCourse(course)
    }
    const closeEditCourseDialog = () => setEditCourseDialog(false);


    const openDeleteCourseDialog = (course) => {
        setDeleteCourseDialog(true);
        setCurrentCourse(course);
    };
    const closeDeleteCourseDialog = () => setDeleteCourseDialog(false);

    const filteredCourses = courseList.filter(course=>course.title.includes(search))


    const sortCoursesDes=()=>{setCourseList(orderBy(courseList,"price","asc"))}
    const sortCourseAsc=()=>{setCourseList(orderBy(courseList,"price","desc"))}


    const courseData = paginate(filteredCourses, currentPage, perPage);
    return (
        <DashContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                perPage,
                handlePageChange,
                courseData,
                openNewCourseDialog,
                openEditCourseDialog,
                openDeleteCourseDialog,
                setSearch,
                filteredCourses,
                sortCoursesDes,
                sortCourseAsc,
                validator

            }}>
            <NewCourseDialog showDialog={newCourseDialog} closeDialog={closeNewCourseDialog}/>
            <EditCourseDialog showDialog={editCourseDialog} closeDialog={closeEditCourseDialog} course={currentCourse}/>
            <DeleteCourseDialog
                showDialog={deleteCourseDialog}
                closeDialog={closeDeleteCourseDialog}
                course={currentCourse}
            />
            {children}


        </DashContext.Provider>

    )
}