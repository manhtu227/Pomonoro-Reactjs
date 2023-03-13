import React from "react";
import classes from './Header.module.css';
import Button from "../UI/Button";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <a >
                <img className={classes.img} src="https://pomofocus.io/images/icon-white2.png" alt="pomofoucs icon" />
                <span>Pomofocus</span>
            </a>
            <div className={classes.button}>
                <Button className="tiltebtn">
                    <img src="https://pomofocus.io/icons/graph-white.png" className={classes.icon} alt="graph icon" />
                    <span> Report</span>
                </Button>
                <Button className={"tiltebtn"}>
                    <img src="https://pomofocus.io/icons/graph-white.png" className={classes.icon} alt="graph icon" />
                    <span> setting</span>
                </Button>
                <Button className="tiltebtn">
                    <img src="https://pomofocus.io/icons/user-white.png" className={classes.icon} alt="graph icon" />
                    <span> Login</span>
                </Button>
            </div>
        </header>
    )
}
export default Header