import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([{ name: 'a' }, { name: 'b' }]);

  function submitHandler(e) {
    e.preventDefault();
    const obj = { name, number, email };
    axios
      .post('http://localhost:3001/users', obj)
      .then((res) => {
        console.log('data posted to data base');
        return console.log(res.data);
      })
      .catch((err) => console.log(err));

    setName('');
    setNumber('');
    setEmail('');
  }

  function getAllHandler() {
    axios
      .get('http://localhost:3001/users')
      .then((res) => {
        console.log('Getting all data');
        console.log(res.data);
        return setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  function getOneHandler() {
    const _id = '6329893dda6a226601e824e6';
    axios
      .get(`http://localhost:3001/users/${_id}`)
      .then((res) => {
        console.log('Getting one data');
        console.log(res.data);
        return setData([res.data]);
      })
      .catch((err) => console.log(err));
  }

  function patchOneHandler() {
    const _id = '632986b8da6a226601e824a2';
    axios
      .patch(`http://localhost:3001/users/${_id}`, { name: 'Raju sakinala' })
      .then((res) => {
        console.log('updating one data');
        console.log(res.data);
        return setData([res.data]);
      })
      .catch((err) => console.log(err));
  }
  function deletetOneHandler() {
    const _id = '6329a29eda6a226601e82566';
    axios
      .delete(`http://localhost:3001/users/${_id}`)
      .then((res) => {
        console.log('deleting one data');
        console.log(res.data);
        return setData([res.data]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios('http://localhost:3001/users')
      .then((res) => {
        console.log('useEffect called');
        console.log(res.data);
        return setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <h1>User form</h1>
      <form onSubmit={submitHandler}>
        Name___:
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        Number:
        <input type="text" placeholder="Enter number" value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        Email__:
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={getAllHandler} type="submit">
        Get All Candidates
      </button>
      <button onClick={getOneHandler} type="submit">
        Get ONE Candidate
      </button>
      <button onClick={patchOneHandler} type="submit">
        patch ONE Candidate
      </button>
      <button onClick={deletetOneHandler} type="submit">
        delete ONE Candidate
      </button>
      

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>{obj.number}</td>                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
