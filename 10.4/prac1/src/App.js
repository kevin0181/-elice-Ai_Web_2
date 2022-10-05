import { useState } from "react";

function App() {

  const Welcome = ({ name }) => {
    console.log(name);
    return <h1>hello, {name}</h1>
  }

  const [number, setNumber] = useState(0);
  const [user, setUser] = useState({
    name: "민수",
    grade: 1
  });

  let change = () => {
    // let user2 = { ...user };
    // user2.grade = 2;
    // setUser(user2);
    setUser({
      ...user,
      grade: 2
    })
  }

  return (
    <div className="App">
      <Welcome name="수영" />
      <Welcome name="민수" />
      <Welcome name="영희" />
      <p>버튼을 {number}을 눌렀습니다.</p>
      <button onClick={() => {
        setNumber((number) => {
          return number + 1;
        });
      }}>증가</button>

      <p>{JSON.stringify(user)}</p>
      <button onClick={change}>변경</button>
    </div>
  );
}

export default App;
