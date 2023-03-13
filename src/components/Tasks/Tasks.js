import React, { Fragment, useState } from "react";
const Tasks = (props) => {
    const [idTask, setIdTask] = useState(0);
    return (
        <Fragment>
            <div>
                <div>#{idTask}</div>
                <span>Time to focus!</span>
            </div>
        </Fragment>
    )
}
export default Tasks
