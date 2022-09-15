const TwoDotDistance = {
    point1: {
      x: 0,
      y: 0,
    },
  
    point2: {
      x: 0,
      y: 0,
    },
  
    setPoints: function (x1, y1, x2, y2) {
      // point1, point2의 값을 세팅합니다.
      this.point1 = { x: x1, y: y1 };
      this.point2 = { x: x2, y: y2 };
      return;
    },
  
    calculateDistance: function () {
      // 두 점 사이의 거리를 구해, 소숫점 두자리까지 계산하고 문자열을 리턴합니다.
      // 결과가 NaN 이라면, 숫자 0을 문자열로 리턴합니다.
  
      //Math.pow(값, 제곱);
      let d = Math.sqrt(
        Math.pow(this.point1.x - this.point2.x, 2) +
          Math.pow(this.point1.y - this.point2.y, 2)
      );
  
      if (d === NaN) {
        return '0';
      } else {
        return d.toFixed(2);
      }
    },
  };
  
  export default TwoDotDistance;
  