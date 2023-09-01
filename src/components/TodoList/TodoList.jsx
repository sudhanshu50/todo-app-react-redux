import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, clearAll, removeTask, taskComplete } from "../../reducers/todoSlice";
import styles from "../TodoList/TodoList.module.css";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("")

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.tasks)
  console.log(todos)

  const addHandler = () => {
    let trimTodo = todo.trim()
    let trimDescription = description.trim()
    let trimDate = date.trim();

    if (trimTodo && trimDescription && trimDate) {
      dispatch(addTask(
        {
          todoName: trimTodo,
          isDone: false,
          isEditing: false,
          editingTodo: trimTodo,
          editingDescp: trimDescription,
          todoDescp: trimDescription,
          date: trimDate
        }
      ))
    }
    setTodo("");
    setDescription("");
    setDate("")
  }

  const completeTaskHandler = (index) => {
    dispatch(taskComplete(index));
  };

  const getDueDayClass = (date) => {
    if (date && new Date(date) < new Date()) {
      // console.log("coming");
      return styles['due_day'];
    }
    return '';
  };

  // console.log(typeof styles)

  return (
    <>
      <div>
        <h1>To-Do List</h1>
        <h3><i>Keep a track of your todos</i></h3>
        <div className={styles.taskInputBox}>
          <label className={styles.label} htmlFor="task" >Task:</label>
          <input className={styles.mainInput} id="task" type="text" onChange={(e) => setTodo(e.target.value)} placeholder="Enter task here" value={todo} required />
        </div>
        <div className={styles.descriptionInputBox}>
          <label className={styles.label} htmlFor="descp">Description: </label>
          <textarea placeholder="Enter some details" rows="1" className={styles.mainInput} id="descp" onChange={(e) => setDescription(e.target.value)} value={description} required />
        </div>
        <div >
          <label className={styles.label} htmlFor="date" >Date: </label>
          <input className={styles.mainInput} id="date" type="date" onChange={(e) => setDate(e.target.value)} value={date} />
        </div>
        <div>
          <button className={styles.addBtn} onClick={addHandler}>Add Task</button>
          <button className={styles.addBtn} onClick={() => dispatch(clearAll())} >Clear All</button>
        </div>
        <hr />

        <div className={styles.box} >
          {todos && todos.map((task, index) => (
            <div className={`${task.isDone ? styles.done : styles.mainTask
              } ${getDueDayClass(task.date)}`} key={index} >
              <input type="checkbox" onChange={() => completeTaskHandler(index)} checked={task.isDone} /><span className={styles.todo}>{task.todoName}&nbsp;&nbsp;&nbsp;</span><span>Due: {task.date} </span>
              <p> {task.todoDescp}</p>
              {task.date && new Date(task.date) < new Date() && (
                <span style={{ color: "red", fontFamily: "system-ui" }}>Due day is passed</span>
              )}
              <br />
              <button onClick={() => dispatch(removeTask(index))} className={styles.delBtn}>Delete</button>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TodoList;