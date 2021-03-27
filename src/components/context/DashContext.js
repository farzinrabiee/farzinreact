import React, {createContext} from "react";

export const DashContext = createContext({
        currentPage: 1,
        setCurrentPage: () => {
        },
        perPage: 5,
        handlePageChange: () => {
        },
        currentCourse: {},
        setSearch: () => {
        },
        openNewCourseDialog: () => {
        },
        openEditCourseDialog: () => {
        },
        openDeleteCourseDialog: () => {
        },
        courseData: [],
        filteredCourses: [],
        sortCoursesAsc: () => {
        },
        sortCoursesDes: () => {
        },
        validator:null
    }
)