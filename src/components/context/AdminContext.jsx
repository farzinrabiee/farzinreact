import React, {useState} from "react";
import {DashContext} from "./DashContext";
import {paginate} from "../../utils/paginate";
import NewCourseDialog from "../admin/dialogs/NewCourseDialog";
import {EditCourseDialog} from "../admin/dialogs/EditCourseDialog";


export const AdminContext = ({courses, children}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(2);
    const [currentCourse,setCurrentCourse]=useState({})
    const [newCourseDialog, setNewCourseDialog] = useState(false)
    const [editCourseDialog,setEditCourseDialog]=useState(false)
    const openNewCourseDialog = () => setNewCourseDialog(true)
    const closeNewCourseDialog = () => setNewCourseDialog(false)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const openEditCourseDialog=(course)=>{
        setEditCourseDialog(true)
        setCurrentCourse(course)


    }

    const courseData = paginate(courses, currentPage, perPage);
    return (
        <DashContext.Provider
            value={{currentPage, setCurrentPage, perPage, handlePageChange, courseData, openNewCourseDialog}}>
            <NewCourseDialog showDialog={newCourseDialog} closeDialog={closeNewCourseDialog}/>
            <EditCourseDialog />

            {children}


        </DashContext.Provider>

    )
}