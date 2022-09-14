function inputButton() {
    let text = document.getElementById("textInput").value;
    console.log(text);
    document.getElementById("textP").innerHTML = text;
}

window.onload = function () {
    // $('#hi3'); // === document.ElementgetById("hi3");
    // console.log($('#hi3').val());

    $('#hi3').on('click', function () {
        //이벤트 핸들러
        // alert("안녕하세요.");
        $('#hi3').val("반갑습니다.");
        // document.getElementById("hi3").value = "반갑습니다.";
    });

    fun1(); // -> 화살표 함수 호출.
    fun2(); // -> 일반 함수 호출.

    console.log(fun1);
    console.log(fun2);

}

let fun1 = () => { // -> 화살표 함수 선언
    console.log("화살표 함수 입니다.");
}

function fun2() { // -> 일반 함수 선언
    console.log("일반 함수 입니다.");
}


// $(document).ready(function(){ //window.onload 똑같음.

// });


$('#yellowBtn').on('click', () => {  // function(){}
    $(document.body).css("background-color", "yellow");
})

function yelloChange() {
    document.body.style.backgroundColor = 'yellow';
}