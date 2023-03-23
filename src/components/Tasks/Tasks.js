import React, { Fragment, useState, useEffect, useContext } from "react";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";
import TaskContext from "../store/task-context"
const Tasks = (props) => {
    const taskCtx = useContext(TaskContext)
    
    return (
        <Fragment>
            <div className={classes.Tasks}>
                <span>Tasks</span>
                <div>
                    <button className={classes.threeDot}>
                        <img className={classes.tooltip} src="https://pomofocus.io/icons/threedots-white.png" alt="three dots"></img>
                    </button>
                </div>

            </div>
            {taskCtx.tasks.map((task) => (
                <TaskItem
                    className={task.id === taskCtx.selectedTaskId ? "action__taskItem" : ""}
                    task={task}
                    key={task.id}
                    onClick={() => taskCtx.taskItemClick(task.id)}
                />
            ))}


        </Fragment>
    )
}
export default Tasks
