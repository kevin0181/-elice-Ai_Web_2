import socketIoClient from "socket.io-client";
import {useEffect, useState} from "react";

const socketAdmin = socketIoClient('http://localhost:8082/admin');
const socketUser = socketIoClient('http://localhost:8082/user');

function App() {

    let userConnection = () => {
        socketUser.on("connect", () => {
            console.log("유저 커넥트")
        })
        socketUser.on("user res data", (data) => {
            console.log("받아온 유저 데이터 : " + JSON.stringify(data));
        })
    }

    let adminConnection = () => {
        socketAdmin.on("connect", () => {
            console.log("어드민 커넥트");
        });

        socketAdmin.on("admin res data", (data) => {
            console.log("받아온 어드민 데이터 : " + JSON.stringify(data));
        })
    }


    const [data, setData] = useState({
        name: "",
        message: ""
    });

    const [adminRoom, setAdminRoom] = useState("");
    const [adminRoomList, setAdminRoomList] = useState([]);

    useEffect(() => {
        // userConnection();
        // adminConnection();

        getRoomData();


    }, []);

    let getRoomData = () => {
        socketAdmin.on("admin get room", (data) => {
            console.log(data);
            if (data.length !== 0) {
                setAdminRoomList(data);
            }
        })
    }

    // useEffect(() => {
    //     console.log(adminRoomList);
    // }, [adminRoomList])

    let onChangeAdminRoom = (e) => {
        setAdminRoom({
            ...adminRoom,
            [e.target.name]: e.target.value
        })
    }

    let addRoom = async () => {
        await setAdminRoomList((list) => [...list, adminRoom]);
    }


    let onClickAdminRoom = () => {
        if (adminRoom === "") {
            alert("방 이름을 설정하세요.");
            return;
        } else {
            addRoom().then(() => {
                socketAdmin.emit("admin create room", adminRoom);
            });
        }
    }

    let onChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    let clickButton = () => {
        socketAdmin.emit("admin submit", data);
    }

    let clickButton2 = () => {
        socketUser.emit("user submit", data);
    }

    let [showChat, setShowChat] = useState(false);
    let [selectRoom, setSelectRoom] = useState("");

    let [chat, setChat] = useState({
        name: "",
        chat: ""
    });

    let [viewChat, setViewChat] = useState([]);

    useEffect(() => {
        console.log(viewChat);
    }, [viewChat]);

    let changeChat = (e) => {
        setChat({
            ...chat,
            [e.target.name]: e.target.value
        });
    }

    let sendChat = () => {
        setViewChat(arr => [...arr, chat]);
        socketAdmin.emit("send chat", chat, selectRoom);
    }

    let openChat = () => {
        socketAdmin.on("get chat", (data) => {
            setViewChat(arr => [...arr, data]);
        })
    }

    let insertRoom = () => {
        socketAdmin.emit("insert room", selectRoom);
    }

    let exitRoom = async () => {
        setShowChat(!showChat);
        setViewChat([]);
        // let newRoomList = adminRoomList.filter(room => room.room !== selectRoom);
        // setAdminRoomList(newRoomList);
        socketAdmin.emit("leave room", selectRoom);
    }

    useEffect(() => {
        if (selectRoom !== "") {
            insertRoom();
            setShowChat(!showChat);
            openChat();
        }
    }, [selectRoom]);


    return (
        <div className="App" style={{
            display: "flex",
            width: "100%",
            height: "100%"
        }}>
            <div style={{width: "50%"}}>
                <input type={"text"} name={"name"} onChange={onChangeData}/>
                <input type={"text"} name={"message"} onChange={onChangeData}/>
                <input type={"button"} onClick={clickButton} value={"admin 전송"}/>
                <input type={"button"} onClick={clickButton2} value={"user 전송"}/>
                <br/>
                <br/>
                <input type={"text"} name={"room"} onChange={onChangeAdminRoom}/>
                <input type={"button"} value={"관리자 방 생성"} onClick={onClickAdminRoom}/>

                <div style={{margin: "50px 0px"}}>
                    {
                        adminRoomList.map((data, index) => (
                            <div key={index} style={{
                                width: '120px',
                                height: '40px',
                                border: "1px solid black",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "10px 0px"
                            }} onClick={() => {
                                setSelectRoom(data.room);
                            }}>
                    <span>
                        방 이름 : {data.room}
                    </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{width: "50%", padding: "5%", height: "100%"}}>
                {
                    showChat === true ? (<Chat changeChat={changeChat} chat={chat} sendChat={sendChat}
                                               selectRoom={selectRoom} viewChat={viewChat} getRoomData={getRoomData}
                                               exitRoom={exitRoom}/>) : (<></>)
                }
            </div>
        </div>

    );
}

let Chat = ({changeChat, chat, sendChat, selectRoom, viewChat, exitRoom, getRoomData}) => {
    return <>
        <div style={{border: "1px solid green", padding: '20px', height: "600px"}}>
            <div style={{paddingBottom: "10px", borderBottom: "1px solid green"}}>
                <input type={"text"} name={"name"} value={chat.name} onChange={changeChat}/>
                <input type={"text"} name={"chat"} value={chat.chat} onChange={changeChat}/>
                <input type={"button"} value={"전송"} onClick={sendChat}/>
                <input type={"button"} value={"방 나가기"} onClick={() => {
                    exitRoom().then(() => {
                        getRoomData();
                    });
                }}/>
                <span style={{marginLeft: "90px"}}>방 이름 : {selectRoom}</span>
            </div>

            <div>
                {
                    viewChat.map((resChat, index) => (
                        <div key={index}>
                            {
                                resChat.name === chat.name ? (<p>{resChat.name} : {resChat.chat}</p>)
                                    :
                                    (<p style={{textAlign: "right"}}>{resChat.name} : {resChat.chat}</p>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default App;
