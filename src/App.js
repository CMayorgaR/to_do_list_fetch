import './App.css';
import { useState, useEffect } from "react";

const API_URL = "http://assets.breatheco.de/apis/fake/todos/user/cmayorga"

function App() {

  /* fetch('https://assets.breatheco.de/apis/fake/todos/user/cmayorga', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log("DATA",data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    }); */

    //__________________________________________________________________________________________________________________________________________________________
  const [list, setList] = useState([]);
 
  useEffect (()=> {
    fetch (API_URL)
    .then ((response)=>{return response.json()})
    .then ((data)=> console.log(data))}, []);
  
    
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
            placeholder='Tareas Pendientes'/>
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