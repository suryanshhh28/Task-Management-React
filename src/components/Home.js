import React, { useEffect, useState } from "react";
import Task from "./Task";

const Home = () => {
  const initialArray = localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task"))
    : [];

  const [task, setTask] = useState(initialArray);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setTask([
      ...task, // spreads each element, will keep on adding previous things and new things
      {
        title,
        description,
      },
    ]);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    // as in local storage only strigs are stored, thus whenever task array changes, it will convert it into string and store in local storage
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const deleteTask = (index) => {
    const filteredArray = task.filter((val, i) => {
      return i !== index; // will filter out each i that has not matched with index i.e. if we delete task 1, thus 1 != 1, thus it will not include it in filtered array
    });
    setTask(filteredArray);
  };

  return (
    <div className="container">
      <h1>DAILY GOALS</h1>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button type="submit">ADD</button>
      </form>
      {task.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description}
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
