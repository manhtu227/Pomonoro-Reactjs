import React, { useState, useReducer, Fragment, useEffect, useRef } from "react";
import Button from "../UI/Button";
import classes from "./Countdowns.module.css";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer";

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
    const timers = {
        "Pomodoro": 25,
        "Short Break": 1,
        "Long Break": 10,
    };
    const [isRunning, setIsRunning] = useState(false);
    const [countdown, dispatchCountdown] = useReducer(countdownReducer, {
        timer: timers.Pomodoro,
        type: "Pomodoro",
    });
    const [currentPosition, setCurrentPosition] = useState(0);
    const intervalIdRef = useRef(null);

    const handleButtonClick = (countdownType, timer) => {
        if (isRunning) {
            const result = window.confirm("The timer is still running, are you sure you want to switch?");
            if (result) {
                // user clicked OK
                resetCheckTime();
                dispatchCountdown({ type: "set", timer: timer, countdownType: countdownType });
                setIsRunning(false);
            }
        }
        else {
            resetCheckTime();
            dispatchCountdown({ type: "set", timer: timer, countdownType: countdownType });
            setIsRunning(false);
        }

    };

    const handleNextClick = () => {
        resetCheckTime();
        setIsRunning(!isRunning);
        dispatchCountdown({ type: "next", timers: timers });
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const resetCheckTime = () => {
        setCurrentPosition(0);
        const checkTimeEl = document.querySelector(`.${classes.checkTime}`);
        if (checkTimeEl) {
            checkTimeEl.style.width = 0;
        }
    };

    useEffect(() => {
        if (isRunning) {
            const checkTimeEl = document.querySelector(`.${classes.checkTime}`);
            const intervalId = setInterval(() => {
                setCurrentPosition((currentPosition) => {
                    const newCurrentPosition = currentPosition + 1;
                    const maxPosition = countdown.timer * 60;
                    const check = (newCurrentPosition * 100) / maxPosition;
                    if (check >= 100) {
                        handleButtonClick("Pomodoro", 25);
                    } else {
                        checkTimeEl.style.width = `${check}%`;
                    }
                    return newCurrentPosition > maxPosition ? 0 : newCurrentPosition;
                });
            }, 1000);
            intervalIdRef.current = intervalId;
        } else {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunning, countdown]);
    useEffect(() => {
        if (countdown.type === "Short Break") {
            props.setBackgroundColor("#38858a");
        } else if (countdown.type === "Long Break") {
            props.setBackgroundColor("#397097");
        } else {
            props.setBackgroundColor("#ba4949");
        }
    }, [countdown.type]);
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
                <PomodoroTimer key={countdown.type} pomodoroTime={countdown.timer} isRunning={isRunning} />
                <div className={classes.button}>
                    <Button className={isRunning ? "pausebtn" : "startbtn"} onClick={handleStartStop}>
                        {isRunning ? "PAUSE" : "START"}
                    </Button>
                    {isRunning && (
                        <div className={classes.button__img}>
                            <Button onClick={handleNextClick}>
                                <img src="https://pomofocus.io/icons/next-white3.png" alt="img" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Countdowns;