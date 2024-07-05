import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { API_URL } from "../utils";

export const AddTask = ({ fetchTasks }) => {
    const [newTask, setNewTask] = useState([]);
    const addNewTask = async () => {
        try {
            await axios.post(API_URL, { name: newTask, completed: false });
            await fetchTasks();
            setNewTask('');
        } catch (error) {
            console.error('Error creating task', error);
        }
    }
    return (
        <div className="header">
            <Typography variant="h5" className="title">
                <b>
                    Ishaan&apos;s Tasks
                </b>
            </Typography>
            <div className="addTaskForm">
                <TextField 
                    size="small" 
                    label="Task..." 
                    variant="outlined" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button disabled={!newTask.length} size="small" variant="outlined" onClick={addNewTask} startIcon={<AddIcon/>}>
                    CREATE
                </Button>
            </div>

        </div>
    );
};