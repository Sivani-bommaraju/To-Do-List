
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const API_BACKEND = process.env.REACT_APP_BACKEND_URL;

const Create = () => {
    const [task, setTask] = useState('');

    const createTask = async () => {
        if (!task.trim()) return;

        try {
            const res = await axios.post(`${API_BACKEND}/add`, {
                task: task.trim()
            });

            console.log(res.data);
            setTask('');
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <h1>Todo List</h1>
            <div className='create-form'>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={createTask}>ADD</button>
            </div>
        </main>
    );
};

export default Create;
