import React, {useState,useEffect} from "react";
import {DashContext} from "./DashContext";
import {paginate} from "../../utils/paginate";
import NewCourseDialog from "../admin/dialogs/NewCourseDialog";
import {EditCourseDialog} from "../admin/dialogs/EditCourseDialog";
import DeleteCourseDialog from "../admin/DeleteCourseDialog";


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
                filteredCourses

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