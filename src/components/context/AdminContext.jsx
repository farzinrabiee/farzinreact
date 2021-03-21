import React, {useState} from "react";
import {DashContext} from "./DashContext";
import {paginate} from "../../utils/paginate";



export const AdminContext=({courses,children})=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(2);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const courseData = paginate(courses, currentPage, perPage);
    return(
        <DashContext.Provider value={{currentPage,setCurrentPage,perPage,handlePageChange,courseData}}>
            {children}


        </DashContext.Provider>

    )
}