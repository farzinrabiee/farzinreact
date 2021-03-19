import React from "react";
import {Img} from "react-image";
import {ScaleLoader} from "react-spinners";



export const ShowImage=({image})=>{

    return(
        <Img src={[`https://toplearnapi.ghorbany.dev/${image}`]}
             loader={
                 <div className="text-center ">
                     <ScaleLoader loading={true} color={"green"}/>
                 </div>
             }

        />

    )
}