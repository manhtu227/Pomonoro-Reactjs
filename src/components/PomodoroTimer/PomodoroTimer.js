import React, { useState, useEffect, Fragment, useContext } from "react";
import classes from "./PomodoroTimer.module.css"
import Button from "../UI/Button";
import TaskContext from "../store/task-context";

const PomodoroTimer = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.pomodoroTime * 60);
  const taskCtx = useContext(TaskContext)
  //   useEffect(() => {
  //     if (isRunning) {
  //         const checkTimeEl = document.querySelector(`.${classes.checkTime}`);
  //         const intervalId = setInterval(() => {
  //             setCurrentPosition((currentPosition) => {
  //                 const newCurrentPosition = currentPosition + 1;
  //                 const maxPosition = countdown.timer * 60;
  //                 const check = (newCurrentPosition * 100) / maxPosition;
  //                 if (check >= 100) {
  //                     handleButtonClick("Pomodoro", 1);
  //                 } else {
  //                     checkTimeEl.style.width = `${check}%`;
  //                 }
  //                 return newCurrentPosition > maxPosition ? 0 : newCurrentPosition;
  //             });
  //         }, 1000);
  //         intervalIdRef.current = intervalId;
  //     } else {
  //         clearInterval(intervalIdRef.current);
  //         intervalIdRef.current = null;
  //     }
  //     return () => clearInterval(intervalIdRef.current);
  // }, [isRunning, countdown]);
  useEffect(() => {
    let interval = null;

    if (props.isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        const check = 100 - (timeLeft * 100) / (props.pomodoroTime * 60);
        props.setWidth(check)
      }, 1000);
    } else {
      // clear được gọi để ngừng chu kỳ lặp lại
      clearInterval(interval);
    }
    if (timeLeft === 0) {
      props.setCreateTask();
      props.resetTime();
      const taskToUpdate = taskCtx.tasks.find(task => task.id === taskCtx.selectedTaskId);
      taskToUpdate.achieve++;
      taskCtx.updateTask(taskToUpdate.id,taskToUpdate);
    }

    return () => clearInterval(interval);
  }, [props.isRunning, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };



  return (
    <Fragment>
      <div className={classes.time}>{formatTime(timeLeft)}</div>
    </Fragment>
  );
};

export default PomodoroTimer;
