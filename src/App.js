import './App.css';
import { useState } from "react";

function App() {

  const [list, setList] = useState([]);

  const [task, newTask] = useState({});

  const handleChange = (e) => {
    newTask({
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    setList([...list, task])
  };

  const erase = (id) => {
    const newlist = list.filter((item, index) => index !== id);
    setList(
      newlist
    );
  }

  return (
    <div className="App">
      <div className="container mb-4">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="d-flex justify-content-center mx-auto">
          <input className="form-control"
            onChange={(e) => handleChange(e)}
            type="text"
            name="toDo"
            value={task.toDo}
            placeholder='Tareas Pendientes' />
        </div>
        <button type="submit" className="btn btn-primary">Añadir tarea</button>
      </form>
      <ul className="list-group list-group-flush">
        {list.map((item, index) => {
          return (
            <li className="list-group-item d-flex justify-content-between" key={index}>
              {item.toDo}
              <span className="float-end">
                <button onClick={() => erase(index)} type="button" className="btn btn-outline-secondary btn-sm">X</button>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  );
}

export default App;