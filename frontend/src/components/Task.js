import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import { UpdateTask } from "./UpdateTask";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Task = ({ task, fetchTasks }) => {
    const { id, name, completed } = task;
    const [isCompleted, setIsCompleted] = useState(completed);
    const [isDialogueOpen, setIsDialogueOpen] = useState(false);

    const handleUpdateTaskCompletion = async () => {

        try {
            await axios.put(API_URL, { id, name, completed: !isCompleted });
            setIsCompleted((prev) => !prev);
        } catch (error) {
            console.error('Error updating task', error);
        }
    }

    const handleDeleteTask = async () => {
        try {
            await axios.delete(`${API_URL}/${task.id}`);
            await fetchTasks();
            // window.location.reload();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    }

    return (
        <div className="task">
            <div className={classnames("flex",{done: isCompleted})}>
                <Checkbox 
                    size="small" 
                    checked={isCompleted} 
                    color="primary"
                    onChange={handleUpdateTaskCompletion}
                />
            </div>
            <div className={classnames({done: isCompleted})}>
                <Typography variant="subtitle1" className="taskName">{name}</Typography>
            </div>
            <div className="taskButtons">
                <Button color="success" size="small" onClick={() => setIsDialogueOpen(true)}>
                    <EditIcon />
                </Button>
                <Button color="error" size="small" onClick={handleDeleteTask}>
                    <DeleteIcon />
                </Button>
            </div>

            <UpdateTask fetchTasks={fetchTasks} isDialogueOpen={isDialogueOpen} setIsDialogueOpen={setIsDialogueOpen} task={task}/>
        </div>
    );
};
