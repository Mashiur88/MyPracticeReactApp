import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { FaPlus, FaUserPlus, FaExchangeAlt } from 'react-icons/fa';
import { showToast, CustomToastContainer } from "../../utils/CustomToast";
import CustomAlert from "../../utils/CustomAlert.jsx";
import CustomConfirmationAlert from "../../utils/CustomConfirmationAlert.jsx";

import TaskTable from './TaskTable.jsx';
import Button from "../../elements/Button";
import Modal from "../../elements/Modal";
import TextBox from "../../elements/TextBox";
import TextArea from "../../elements/TextArea";
import DatePicker from "../../elements/DatePicker";
import './TaskList.css';

const TaskList = () => {

    // const [tasks, setTasks] = useState([
    //     { id: 1, taskCode: "T001", taskName: "Design UI", status: "Pending", isCompleted: false, deadline: "2025-03-01", description: "" },
    //     { id: 2, taskCode: "T002", taskName: "Build Backend", status: "Completed", isCompleted: true, deadline: "2025-02-25", description: "" },
    //     { id: 3, taskCode: "T003", taskName: "Testing", status: "In Progress", isCompleted: false, deadline: "2025-03-05", description: "" },
    // ]);

    const API_BASE_URL = process.env.REACT_APP_BASE_URL;
    // console.log(API_BASE_URL)

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/tasks`);  // Replace with your Spring Boot API endpoint
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [currentTask, setCurrentTask] = useState(null);
    const [taskCode, setTaskCode] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');

    const handleAddTask = () => {
        console.log("Adding");
        setModalTitle("Add Task");
        setCurrentTask(null);
        setTaskCode('');
        setTaskName('');
        setTaskDescription('');
        setTaskDeadline('');
        setIsModalOpen(true);
    };
    
    const handleEdit = (task) => {
        console.log("Editing:", task);
        setModalTitle("Edit Task");
        setCurrentTask(task);
        setTaskCode(task.taskCode);
        setTaskName(task.taskName);
        setTaskDescription(task.taskDescription);
        setTaskDeadline(task.deadline);
        setIsModalOpen(true);
    };
    
    // const handleDelete = (task) => {
    //     console.log("Deleting:", task);
    // };

    const handleDelete = async (task) => {
        try {
            CustomConfirmationAlert({
                title: "Delete Confirmation",
                text: "Are you sure you want to delete this item?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel",
                onConfirm: async () => {
                    const response = await axios.delete(`${API_BASE_URL}/api/tasks/${task.id}`);  // Replace with your Spring Boot API endpoint
                    setTasks(tasks.filter((t) => t.id !== task.id));
                    if(response.status == 204){
                        CustomAlert({
                            title: "Success",
                            text: "Task Deleted Successfully",
                            icon: "success",
                            onConfirm: () => console.log("Task Deleted!"),
                        });
                    } else {
                        CustomAlert({
                            title: "Failed!",
                            text: "Task Deletion failed",
                            icon: "error",
                            onConfirm: () => console.log("Task Deletion Failed!"),
                        });
                    }
                },
                onCancel: () => console.log("Action cancelled!"),
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // const handleSave = () => {
    //     if (currentTask) {
    //         setTasks((prevTasks) =>
    //             prevTasks.map((task) =>
    //                 task.id === currentTask.id
    //                     ? { ...task, code: taskCode, name: taskName, description: taskDescription, deadline: taskDeadline }
    //                     : task
    //             )
    //         );
    //     } else {
    //         const newTask = {
    //             id: tasks.length + 1,
    //             code: taskCode || `T00${tasks.length + 1}`,
    //             name: taskName,
    //             status: "Pending",
    //             isCompleted: false,
    //             deadline: taskDeadline,
    //             description: taskDescription,
    //         };
    //         setTasks((prevTasks) => [...prevTasks, newTask]);
    //     }
    //     handleModalClose();
    // };

    const handleSave = async () => {
        const taskData = {
            taskCode: taskCode,
            taskName: taskName,
            taskDescription: taskDescription,
            deadline: taskDeadline,
        };

        try {
            if (currentTask) {
                // Edit existing task
                const response = await axios.put(`${API_BASE_URL}/api/tasks/${currentTask.id}`, taskData);  // Replace with your Spring Boot API endpoint
                setTasks(tasks.map((task) =>
                    task.id === currentTask.id ? { ...task, ...taskData } : task
                ));
                if(response.status == 200){
                    CustomAlert({
                        title: "Success",
                        text: "Task Updated Successfully",
                        icon: "success",
                        onConfirm: () => console.log("Task Updated!"),
                    });
                } else {
                    CustomAlert({
                        title: "Failed!",
                        text: "Task Update failed",
                        icon: "error",
                        onConfirm: () => console.log("Task Update Failed!"),
                    });
                }
                fetchTasks();
            } else {
                // Add new task
                const response = await axios.post(`${API_BASE_URL}/api/tasks`, taskData);  // Replace with your Spring Boot API endpoint
                setTasks([...tasks, response.data]);
                if(response.status == 201){
                    CustomAlert({
                        title: "Success",
                        text: "Task Saved Successfully",
                        icon: "success",
                        confirmButtonText: "Ok",
                        onConfirm: () => console.log("Task Saved!"),
                    });
                } else {
                    CustomAlert({
                        title: "Failed!",
                        text: "Task Saving failed",
                        icon: "error",
                        confirmButtonText: "Ok",
                        onConfirm: () => console.log("Task Saving Failed!"),
                    });
                }
                fetchTasks();
            }
            handleModalClose();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    
    // const handleCheckboxChange = (taskId) => {
    //     console.log(taskId);
    //     setTasks((prevTasks) =>
    //         prevTasks.map((task) =>
    //             task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    //         )
    //     );
    // };

    const handleCheckboxChange = async (taskId) => {
        try {
            const taskToUpdate = tasks.find((task) => task.id === taskId);
            const updatedTask = {
                ...taskToUpdate,
                completed: !taskToUpdate.completed,
                status: taskToUpdate.completed ? 'In Progress' : 'Completed',
                statusCode: taskToUpdate.completed ? '02' : '03' 
            };
            const response = await axios.put(`${API_BASE_URL}/api/tasks/${taskId}`, updatedTask);  // Replace with your Spring Boot API endpoint
            setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
            // debugger

            response.status == 200 ? updatedTask.statusCode == '02' ?
            showToast({
                type: "success",
                message: "Task " + updatedTask.taskCode + " In Progress!",
                position: "top-right",
            }) : showToast({
                type: "success",
                message: "Task " + updatedTask.taskCode + " Completed!",
                position: "top-right",
            }) : showToast({
                type: "error",
                message: "Task " + updatedTask.taskCode + " status update failed!",
                position: "top-right",
            });

        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="title">Task List</h1>
                <div className="flex items-center gap-2">
                    <Button
                        icon={FaPlus} 
                        onClick={handleAddTask} 
                        className="border border-green-500 text-green-400 hover:bg-green-600 hover:text-white"
                    />
                    <span className="text-green-500 font-medium">Add Task</span>
                </div>
            </div>
            <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onCheckboxChange={handleCheckboxChange}/>
            
            {/* Modal for Adding and Editing Task */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose} title={modalTitle} className="w-3/5">
                <TextBox
                    label="Task Code"
                    value={taskCode}
                    onChange={(e) => setTaskCode(e.target.value)}
                    placeholder="Enter Task Code"
                />
                <TextBox
                    label="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter Task Name"
                />
                <DatePicker
                    label="Deadline"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                />
                <TextArea
                    label="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Enter Task Description"
                />
                <div className="flex items-center justify-center">
                    <Button 
                        onClick={handleSave} 
                        label={currentTask ? "Save Changes" : "Add Task"} 
                        className="bg-green-500 hover:bg-green-700 px-5 py-3" 
                    />
                    <Button 
                        onClick={handleModalClose} 
                        label={"Close"}
                        className="bg-red-500 hover:bg-red-700 px-5 py-3 ml-2" 
                    />
                </div>
            </Modal>
        </div>
    );
};

export default TaskList;