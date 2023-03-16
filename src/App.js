import React, { useState, useEffect } from "react";
import webSocket from "socket.io-client";

function App() {
  const [ws, setWs] = useState(null);
  const [room, setRoom] = useState("");
  const connectWebSocket = () => {
    //開啟
    setWs(webSocket("ws://localhost:3000", { transports: ["websocket"] }));
  };

  const initWebSocket = () => {
    ws.on("getMessage", (message) => {
      console.log(message);
    });
    ws.on("getMessageAll", (message) => {
      console.log(message);
    });
    ws.on("getMessageLess", (message) => {
      console.log(message);
    });
    ws.on("addRoom", (message) => {
      console.log(message);
    });
    ws.on("receivedMessage", (message) => {
      console.log(message);
    });
    ws.on("leaveRoom", (message) => {
      console.log(message);
    });
    ws.on("disConnection", () => {
      ws.close();
    });
  };

  useEffect(() => {
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log("success connect!");
      //設定監聽
      initWebSocket();
    }
  }, [ws]);

  const sendMessage = (name) => {
    //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    ws.emit(name, "收到訊息囉！");
  };

  const changeRoom = (event) => {
    let room = event.target.value;
    if (room !== "") {
      setRoom(room);
      ws.emit("addRoom", room);
    }
  };

  const disConnectWebSocket = () => {
    ws.emit("disConnection", "XXX");
  };

  return (
    <div>
      <select onChange={changeRoom}>
        <option value="">請選擇房間</option>
        <option value="room1">房間一</option>
        <option value="room2">房間二</option>
      </select>
      <input type="button" value="連線" onClick={connectWebSocket} />
      <input type="button" value="斷線" onClick={disConnectWebSocket} />
      <input
        type="button"
        value="送出訊息，只有自己收到回傳"
        onClick={() => {
          sendMessage("getMessage");
        }}
      />
      <input
        type="button"
        value="送出訊息，讓所有人收到回傳"
        onClick={() => {
          sendMessage("getMessageAll");
        }}
      />
      <input
        type="button"
        value="送出訊息，除了自己外所有人收到回傳"
        onClick={() => {
          sendMessage("getMessageLess");
        }}
      />
    </div>
  );
}

export default App;
