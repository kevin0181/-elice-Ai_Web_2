import { useEffect, useState } from "react";
import "./app.css";

function App() {

  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    console.log(chatList);
  }, [chatList])

  let onChangeText = (e) => {
    setChat(e.target.value);
  }

  let onClickBtn = () => {
    setChatList([
      ...chatList,
      chat
    ]);

    setChat("");
  }

  return (
    <div className="App">
      <div className="t-div">
        <div className="f-div">
          <input type={"text"} value={chat} onChange={onChangeText} />
          <input type={"button"} onClick={onClickBtn} value={"전송"} />
        </div>
        <div className="s-div">
          {
            chatList.map((data, index) => (
              <div className="msg-div" key={index}>
                <p>{data}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
