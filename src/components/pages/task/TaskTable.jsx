import React from "react";
import Button from "../../elements/Button";
import CheckBox from "../../elements/CheckBox";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TaskTable = ({ tasks , onEdit, onDelete, onCheckboxChange}) => {
    return (
        <div className="pt-5 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="px-4 py-2 text-center" style={{width: "13%"}}>Task Code</th>
                        <th className="px-4 py-2 text-left" style={{width: "30%"}}>Task Name</th>
                        <th className="px-4 py-2 text-center" style={{width: "13%"}}>Status</th>
                        <th className="px-4 py-2 text-center" style={{width: "10%"}}>Is Completed</th>
                        <th className="px-4 py-2 text-center" style={{width: "14%"}}>Deadline</th>
                        <th className="px-4 py-2 text-center" style={{width: "20%"}}>Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {tasks.map((task, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-center">{task.taskCode}</td>
                            <td className="px-4 py-3">{task.taskName}</td>
                            <td className="px-4 py-3 text-center">
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                                        task.status === "Pending"
                                            ? "bg-yellow-200 text-yellow-700"
                                            : task.status === "Completed"
                                            ? "bg-red-200 text-red-700"
                                            : "bg-green-200 text-green-700"
                                    }`}
                                >
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <div className="flex justify-center">
                                    <CheckBox checked={task.completed} onChange={() => onCheckboxChange(task.id)} />
                                </div>
                                {/* <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                /> */}
                            </td>
                            <td className="px-4 py-3 text-center">{task.deadline}</td>
                            <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center">
                                    <Button
                                        onClick={() => onEdit(task)}
                                        className="bg-blue-500 text-white hover:bg-blue-600"
                                        icon={FiEdit}
                                    />
                                    <Button
                                        onClick={() => onDelete(task)}
                                        className="ml-2 bg-red-500 text-white hover:bg-red-600"
                                        icon={FiTrash2}
                                    />
                                </div>
                                {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                    Delete
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;