import React, { useState, useContext, useEffect } from "react";
import Button from "../UI/Button";
import classes from "./TaskForm.module.css"
import TaskContext from "../store/task-context";
const TaskForm = (props) => {
    const taskCtx = useContext(TaskContext)
    const [inputNumber, setInputNumber] = useState(1);
    const [inputTitle, setInputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [showNote, setShowNote] = useState(false)

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputNumber(newValue);
    };
    const handleInputTitle = (event) => {
        const newValue = event.target.value;
        setInputTitle(newValue);
    };
    const handleInputNote = (event) => {
        const newValue = event.target.value;
        setInputNote(newValue);
    };
    const handleUpClick = () => {
        setInputNumber(inputNumber + 1);
    };

    const handleDownClick = () => {
        setInputNumber(inputNumber - 1);
    };
    const handleShowNote = e => {
        setShowNote(true)
    }
    const handleSubmit = e => {
        e.preventDefault();

    };
    const onSave = () => {
        if (inputTitle.trim() !== '' && inputNumber > 0) {
            const taskData = {
                title: inputTitle,
                number: inputNumber,
                content: inputNote,
                achieve:0,
                id: Math.random().toString()
            };
            taskCtx.addTask(taskData)
            setInputNumber('')
            setInputTitle('')
            setShowNote('')
        }
    }
    const onCancel = () => {
        console.log("fsfsd")
        props.cancelForm()
    }
    const onDelete = () => {
        taskCtx.deleteTask(props.task.id)
    }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         const form = document.getElementById("task-form");
    //         if (form && !form.contains(event.target)) {
    //             console.log("heeloo")
    //         }
    //     };
    //     document.addEventListener("click", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);
    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.form}>
                <div className={classes.inputTitle}>
                    <input className={classes.title} id="input_activity_title" type="text" onChange={handleInputTitle} placeholder="What are you working on?" value={props.task?.title} />
                </div>
                <div className={classes.est}>
                    <div className={classes.tiltle__est}><span>Est Pomodoros</span></div>
                    <div className={classes.titleUp}>
                        <input className={classes.input_est_pomodoro} id="input_est_pomodoro" type="number" min="0" step="1" value={inputNumber}
                            onChange={handleInputChange} />
                        <div className={classes.updown}>
                            <div className={classes.button} onClick={handleUpClick} ><img src="https://pomofocus.io/icons/caret-up.png" alt="caret" /></div>
                            <div className={classes.button} onClick={handleDownClick} ><img src="https://pomofocus.io/icons/caret-down.png" /></div>
                        </div>

                    </div>
                </div>
                <div className={classes.add}>
                    {showNote ? (
                        <textarea onChange={handleInputNote} className={classes.textNote} placeholder="Some notes..." />
                    ) : (
                        <button onClick={handleShowNote} className={classes.addNote}>
                            + Add Note
                        </button>
                    )}
                    <button className={classes.addNote}>+ Add project
                        <img className={classes.key} src="	https://pomofocus.io/icons/lock-black.png" alt="lock closed icon" ></img></button>
                </div>
            </div>
            <div className={classes.btnForm}>
                {props.task?.id ? <button className={classes.delete} onClick={onDelete} name="delete">Delete</button> : <div></div>}
                <div>
                    <button onClick={onCancel} className={classes.cancel} >Cancel</button>
                    <button type='submit' onClick={onSave} className={classes.save}>Save</button>
                </div>
            </div>
        </form>
    )
}
export default TaskForm