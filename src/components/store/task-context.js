import React, { useState } from "react";
const DUMMY_TASK = [
    {
        id: 'e1',
        title: 'Toilet Paper',
        number: 1,
        achieve: 0,
        content: "quá mệt mỏi"
    },
    { id: 'e2', title: 'New TV', achieve: 0, number: 1 },
    {
        id: 'e3',
        title: 'Car Insurance',
        number: 2,
        achieve: 0,
    },
    {
        id: 'e4',
        title: 'New Desk (Wooden)',
        number: 3,
        achieve: 0,
    },
];
const TaskContext = React.createContext({
    tasks: DUMMY_TASK,
    addTask: (tasks) => { },
    deleteTask: (id) => { },
    updateTask: (id, updateTask) => { },
    taskItemClick: (id) => { },
    selectedTaskId: "",
    selectedFormId: "",
    chooseForm: (id) => { },
    longBreakInterval: 2
});
export const TaskContextProvider = (props) => {
    const [tasks, setTasks] = useState(DUMMY_TASK);
    const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id || "");
    const [selectedFormId, setSelectedFormId] = useState(null);
    const handleTaskItemClick = (taskId) => {
        setSelectedTaskId(taskId);
    };
    const handleTaskForm = (taskId) => {
        setSelectedFormId(taskId);
    };
    const addTaskHandler = taskData => {
        setTasks(prevTasks => {
            return [...prevTasks, taskData]
        });
    };
    const deleteItemHandler = goalId => {
        console.log(tasks[1]?.id)
        setSelectedTaskId(tasks[1]?.id || "")
        setTasks(prevTasks => {
            const updatedGoals = prevTasks.filter(goal => goal.id !== goalId);
            return updatedGoals;
        });
    };

    const updateTaskHandler = (taskId, updatedTaskData) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, ...updatedTaskData };
                }
                return task;
            });
            return updatedTasks;
        });
    };
    return (<TaskContext.Provider value={{
        tasks: tasks, // danh sách các Task
        addTask: addTaskHandler, // hàm thêm vào Tasks
        deleteTask: deleteItemHandler, // xóa bỏ task
        taskItemClick: handleTaskItemClick,  // kiểm tra xem đang ở task nào 1 lần chỉ được 1 task
        selectedTaskId: selectedTaskId,
        chooseForm: handleTaskForm,// kiểm tra mỗi 1 lần chỉ được 1 form
        selectedFormId: selectedFormId,
        longBreakInterval: 2, updateTask: updateTaskHandler,// dùng để update
    }}>{props.children}</TaskContext.Provider>)

}
export default TaskContext