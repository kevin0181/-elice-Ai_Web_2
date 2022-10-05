import logo from './logo.svg';
import './App.css';
import Btn from "./Btn";
import { useEffect, useState } from 'react';

function App() {

  let data = [{
    id: 1,
    name: "1",
    job: "1"
  }, {
    id: 2,
    name: "2",
    job: "2"
  }];

  const [data2, setData2] = useState(data); // ()안에는 초기값

  useEffect(() => {
    console.log(data2);
  }, [data2]); // [] 안에 아무것도 존재하지 않으면 렌더링 될때 한번 실행


  let msg = () => {
    // alert("hello world");
    
    setData2([
      ...data2,
      {
        id: 3,
        name: "3",
        job: "3"
      }
    ])

    // setData2({
    //   id:3,
    //   name:"3",
    //   job:"3"
    // })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Btn fun={msg} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
