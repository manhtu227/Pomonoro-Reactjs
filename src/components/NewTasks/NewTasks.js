import React, { useContext, useState } from "react";
import TaskForm from "./TaskForm"
import classes from "./NewTasks.module.css"
import TaskContext from "../store/task-context";
const NewTasks = (props) => {
    const taskCtx = useContext(TaskContext)
    const handleButtonClick = () => {
        taskCtx.chooseForm("start")
    }
    const onCancel = () => {
        taskCtx.chooseForm("cancel")
    }
    return (
        taskCtx.selectedFormId !== "start" ?
            <div onClick={handleButtonClick} className={classes.newTask}>
                <img className={classes.addImg} src="https://pomofocus.io/icons/plus-circle-white.png" alt="plus circle white" />
                <div className={classes.addBtn}>Add Task</div>
            </div> : <TaskForm cancelForm={onCancel} />
    )
}
export default NewTasks