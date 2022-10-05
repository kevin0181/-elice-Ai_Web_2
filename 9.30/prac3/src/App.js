import { useState, useEffect } from "react";

import Text from "./Text";

function App() {

  // status라는 변수의 초기 값이 false
  const [status, setStatus] = useState(false);

  let name = "kevin";

  useEffect(() => {
    console.log(status);
  },[status])

  let onClickBtn = () => {
    setStatus(!status);
  }

  return (
    <div className="App">
      <input type={"button"} value={"버튼"} onClick={onClickBtn} />
      {
        status === true ?
          (
            <>
              <Text name={name} />
            </>
          ) :
          (<></>)
      }

    </div>
  );
}

export default App;
