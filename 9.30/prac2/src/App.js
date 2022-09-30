import Com from "./Com";

function App() {

  // component는 앞 글자가 무조건 대문자.
  let FunComponent = ({ data }) => {
    console.log(data);
    //component는 return이 존재해야함.
    return (
      //react에서 사용하는 html -> jsx다.
      <div>
        <p>안녕하세요.</p>
      </div>
    )
  }

  let FunComponent2 = () => {
    return (
      <>
        <div>1</div>
        <div>2</div>
      </>
    )
  }

  return (
    <div className="App">
      <FunComponent data={'데이터'} />
      <Com />
      <FunComponent2 />
    </div>
  );
}

export default App;
