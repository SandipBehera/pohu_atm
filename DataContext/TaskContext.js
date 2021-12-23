import React,{createContext,useState} from "react";
export const TaskContext=createContext();
export const TaskProvide=({children})=>{
    const [taskdata,setTaskData]=useState();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    return(
        <TaskContext.Provider
            value={{
                taskdata,
                name,
                email,
                setTaskData,
                setName,
                setEmail
            }}>
            { children }
        </TaskContext.Provider>
    );

}