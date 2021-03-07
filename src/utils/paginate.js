import _ from "lodash"

export const paginate=(courses,currentPage,perPage)=>{
    const indexCourse=(currentPage-1)*perPage
    return  _(courses).slice(indexCourse).take(perPage).value()

}