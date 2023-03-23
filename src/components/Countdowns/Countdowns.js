import React, { useState, useReducer, Fragment, useEffect, useContext } from "react";
import Button from "../UI/Button";
import classes from "./Countdowns.module.css";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer";
import TaskContext from "../store/task-context";
const COUNTDOWN_TYPES = ["Pomodoro", "Short Break", "Long Break"];

const countdownReducer = (state, action) => {
    switch (action.type) {
        case "set":
            return { timer: action.timer, type: action.countdownType };
        case "next":
            const currentIndex = COUNTDOWN_TYPES.indexOf(state.type);
            const nextIndex = (currentIndex + 1) % COUNTDOWN_TYPES.length;
            const nextCountdownType = COUNTDOWN_TYPES[nextIndex];
            const nextTimer = action.timers[nextCountdownType];
            return { timer: nextTimer, type: nextCountdownType };
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};

const Countdowns = (props) => {
    const [idTask, setIdTask] = useState(0);
    const taskCtx = useContext(TaskContext)

    const timers = {
        "Pomodoro": 1,
        "Short Break": 1,
        "Long Break": 10,
    };
    const [isRunning, setIsRunning] = useState(false);
    const [countdown, dispatchCountdown] = useReducer(countdownReducer, {
        timer: timers.Pomodoro,
        type: "Pomodoro",
    });
    const [shouldRender, setShouldRender] = useState(false);
    const handleButtonClick = (countdownType, timer) => {
        if (isRunning) {
            const result = window.confirm("The timer is still running, are you sure you want to switch?");
            if (result) {
                // user clicked OK
                resetWidth();
                dispatchCountdown({ type: "set", timer: timer, countdownType: countdownType });
                setIsRunning(false);
            }
        }
        else {
            resetWidth();
            dispatchCountdown({ type: "set", timer: timer, countdownType: countdownType });
            setIsRunning(false);
        }

    };

    const handleNextClick = () => {
        resetWidth();
        setIsRunning(!isRunning);
        dispatchCountdown({ type: "next", timers: timers });
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };
    const resetWidth = () => {
        setShouldRender(!shouldRender);
        const checkTimeEl = document.querySelector(`.${classes.checkTime}`);
        if (checkTimeEl) {
            checkTimeEl.style.width = 0;
        }
    }
    const resetCheckTime = () => {
        setIsRunning(false)
        resetWidth();
        setShouldRender(!shouldRender);
        dispatchCountdown({ type: "set", timer: 1, countdownType: "Pomodoro" });
    };
    const setWidth = (width) => {
        const checkTimeEl = document.querySelector(`.${classes.checkTime}`);
        checkTimeEl.style.width = `${width}%`;
    }


    useEffect(() => {
        if (countdown.type === "Short Break") {
            props.setBackgroundColor("#38858a");
        } else if (countdown.type === "Long Break") {
            props.setBackgroundColor("#397097");
        } else {
            props.setBackgroundColor("#ba4949");
        }
    }, [countdown.type]);
    const createTask = () => setIdTask(idTask + 1);
    return (
        <Fragment>
            <div className={classes.checkTime}></div>
            <div className={classes.content}>
                <div className={classes.button}>
                    {COUNTDOWN_TYPES.map((countdownType) => (
                        <Button
                            key={countdownType}
                            className={countdown.type === countdownType ? "timebtn" : ""}
                            type={countdownType}
                            timer={timers[countdownType]}
                            ButtonClick={handleButtonClick}
                        >
                            {countdownType}
                        </Button>
                    ))}
                </div>
                <PomodoroTimer setWidth={setWidth}
                    setCreateTask={createTask}
                    key={shouldRender}
                    pomodoroTime={countdown.timer}
                    isRunning={isRunning}
                    resetTime={resetCheckTime}
                />
                <div className={classes.button}>
                    <Button className={isRunning ? "pausebtn" : "startbtn"} onClick={handleStartStop}>
                        {isRunning ? "PAUSE" : "START"}
                    </Button>
                    {isRunning && (
                        <div className={classes.button__img}>
                            <Button onClick={handleNextClick}>
                                <img className={classes.button__next} src="https://pomofocus.io/icons/next-white3.png" alt="img" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.idTask}>#{idTask}</div>
            <div className={classes.nameTask}>
                {taskCtx.tasks.length > 0 ?
                    taskCtx.tasks.find(task => task.id === taskCtx.selectedTaskId)?.title :
                    countdown.type === "Pomodoro" ? "Time to focus!" : "Time for a break!"}</div>
        </Fragment>
    );
};

export default Countdowns;