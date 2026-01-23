import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsPencil
} from 'react-icons/bs';

const API_BACKEND = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [updatetask, setUpdatetask] = useState('');
  const [taskid, setTaskid] = useState('');

  // Fetch all todos
  useEffect(() => {
    axios
      .get(`${API_BACKEND}/get`)
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Mark task as done/undone
  const edit = (id) => {
    axios
      .put(`${API_BACKEND}/edit/${id}`)
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch(err => console.error(err));
  };

  // Update task text
  const Update = (id, updatedTask) => {
    if (!updatedTask.trim()) return;

    axios
      .put(`${API_BACKEND}/update/${id}`, { task: updatedTask })
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, task: updatedTask } : todo
        ));
        setTaskid('');
        setUpdatetask('');
      })
      .catch(err => console.error(err));
  };

  // Delete task
  const Hdelete = (id) => {
    axios
      .delete(`${API_BACKEND}/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <main>
      <Create />

      {todos.length === 0 ? (
        <div className="task">No tasks found</div>
      ) : (
        todos.map(todo => (
          <div className="task" key={todo._id}>
            <div className="checkbox">
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill
                  className="icon"
                  onClick={() => edit(todo._id)}
                />
              )}

              {taskid === todo._id ? (
                <input
                  type="text"
                  value={updatetask}
                  onChange={(e) => setUpdatetask(e.target.value)}
                />
              ) : (
                <p className={todo.done ? 'through' : 'normal'}>
                  {todo.task}
                </p>
              )}
            </div>

            <div>
              <span>
                <BsPencil
                  className="icon"
                  onClick={() => {
                    if (taskid === todo._id) {
                      Update(todo._id, updatetask);
                    } else {
                      setTaskid(todo._id);
                      setUpdatetask(todo.task);
                    }
                  }}
                />
                <BsFillTrashFill
                  className="icon"
                  onClick={() => Hdelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default Home;
