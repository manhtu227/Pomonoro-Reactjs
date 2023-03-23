import React, { useState, useContext } from "react";
import TaskForm from "../NewTasks/TaskForm";
import Card from "../UI/Card";
import classes from "./TaskItem.module.css"
import TaskContext from "../store/task-context";
const TaskItem = (props) => {
    const taskCtx = useContext(TaskContext)
    const onSetForm = () => {
        
        taskCtx.chooseForm(props.task.id)
    }
    const onCancelForm = () => taskCtx.chooseForm("22")
    return (
        taskCtx.selectedFormId !== props.task.id ? <Card onClick={props.onClick} className={props.className}>
            <div className={classes.taskItem}>
                <div className={classes.taskItem__title}>
                    <div className={classes.tick}></div>
                    <span className={classes.title}>{props.task.title}</span>
                </div>
                <div className={classes.taskItem__number}>
                    <span className={classes.achieve}>{props.task.achieve}<span>/ {props.task.number}</span></span>
                    <div onClick={onSetForm} className={classes.option}>
                        <img src="	https://pomofocus.io/icons/vertical-ellipsis.png" alt="option icon" />
                    </div>
                </div>
            </div>

            {props.task.content ? (<div className={classes.note}><p>{props.task.content}</p></div>) : ""}
        </Card> : <TaskForm task={props.task} cancelForm={onCancelForm} />)
}
export default TaskItem