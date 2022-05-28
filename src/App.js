import './App.css';
import { useState, useEffect } from "react";

const API_URL = "http://assets.breatheco.de/apis/fake/todos/user/cmayorga"

function App() {

  const [list, setList] = useState([]);


  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleSubmit = (evento) => {
    evento.preventDefault();
    setList([...list, { label: '' + task + '', done: false }]);
    console.log(list);
    fetch(API_URL, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify([...list, { label: '' + task + '', done: false }])
    }).then((res) => { return res.json() })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const erase = (id) => {
    setList(list.filter((item, index) => index !== id));
    fetch(API_URL, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify(list.filter((item, index) => index !== id))
    }).then((res) => { return res.json() })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => { return response.json() })
      .then(data => setList(data))
  }, []);

  return (
    <div className="App">
      <h1 className="text-center">To do list:</h1>
      <div className="container mb-4">
        <div className="row">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="d-flex justify-content-center mx-auto">
              <input className="form-control"
                onChange={(e) => handleChange(e)}
                type="text"
                value={task}
                placeholder='Tareas Pendientes' />
            </div>
          </form>
        </div>
        <br></br>
        <ul className="list-group list-group-flush">
          {list.length > 0 ? (list.map((item, index) => {
            return (
              <li className="list-group-item d-flex justify-content-between" key={index}>
                {item.label}
                <span className="float-end">
                  <button onClick={() => erase(index)} type="button" className="btn btn-outline-secondary btn-sm">X</button>
                </span>
              </li>
            )
          }))
            : (<p className="text-primary text-center">La lista está vacía</p>)
          }
        </ul>
      </div>
    </div>
  );
}

export default App;