import React, { useState, useEffect } from 'react';
import { AddTask } from './components/AddTask';
import { Task } from './components/Task';
import axios from 'axios';
import { API_URL } from './utils';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
        <AddTask fetchTasks={fetchTasks}/>
        <div className="task-container">
          {tasks.map((task) => (
            <Task key={task.id} task={task} fetchTasks={fetchTasks}/>
          ))}
        </div>
    </div>
  );
}