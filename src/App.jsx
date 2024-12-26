import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  let [todos, setTodos] = useState([
    { task: "sample task", id: uuidv4(), isDone: false },
  ]); // passing array of an object.....
  let [newTask, setNewTask] = useState("");
  let [doneClick, setDoneClick] = useState(false);

  let updateTodoValue = (event) => {
    // console.log(event.target.value);
    setNewTask(event.target.value);
  };

  let addNewTask = () => {
    setTodos([...todos, { task: newTask, id: uuidv4(), isDone: false }]);
    setNewTask("");
  };

  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  let toUppercase = () => {
    setTodos((prevTodos) =>
      //use callback for updating old values.....
      prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      })
    );
  };

  let toUppercaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };

  let taskCompleteOne = (id, isDone) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id && todo.isDone == false) {
          return {
            ...todo,
            isDone: true,
          };
        } else if (todo.id == id && todo.isDone == true) {
          return {
            ...todo,
            isDone: false,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let taskCompleteAll = (arr) => {
    if (doneClick == false) {
      setDoneClick(true);
      setTodos(
        arr.map((todo) => {
          return {
            ...todo,
            isDone: true,
          };
        })
      );
    } else {
      setDoneClick(false);
      setTodos(
        arr.map((todo) => {
          return {
            ...todo,
            isDone: false,
          };
        })
      );
    }
  };

  return (
    <>
      <header>
        <h1>Todo manager</h1>
        <input
          type="text"
          placeholder="your task"
          value={newTask}
          onChange={updateTodoValue}
        />
        <button onClick={addNewTask}>Add task</button>
      </header>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={
                  todo.isDone ? { textDecorationLine: "line-through" } : {}
                }
              >
                {todo.task}
              </span>
              &nbsp;&nbsp;
              <i
                className="fa-regular fa-trash-can"
                onClick={() => deleteTodo(todo.id)}
                style={{ cursor: "pointer", color: "red" }}
              ></i>
              &nbsp;&nbsp;
              <button onClick={() => toUppercaseOne(todo.id)}>
                To Uppercase
              </button>
              <button onClick={() => taskCompleteOne(todo.id, todo.isDone)}>
                Task Completed
              </button>
            </li>
          ))}
        </ul>
        <button onClick={toUppercase}>To uppercase</button>
        &nbsp;&nbsp;
        <button onClick={() => taskCompleteAll(todos)}>Mark all as done</button>
      </div>
    </>
  );
}

export default App;
