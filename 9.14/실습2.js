function mul(num) {
    let a = 10;
    let b = 20;
    function mul30(num) {
      return num * a * b; // 이 부분을 수정하세요.
    }
    return mul30(num);
  }
  
  function add30(num) {
      
    let a = 10;
  
    return (function () {
      let b = 20;
  
      function add() {
        return a + b + num; // 이 부분을 수정하세요.
      }
  
      return add();
    })();
  }
  
  const myModule = { mul, add30 };
  
  export default myModule;
  