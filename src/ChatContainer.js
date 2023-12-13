import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

import full_exit from "./images/fullscreen-exit-fill.png";
import arrow_left from "./images/arrow-left-s-line.png";


const ChatContainer = (props) => {
  //const baseUrl = process.env.DEV_BASE_URL;
  const { api_key, agent_id, client_id, client_name,env_type, chat_name,sessionId } = props;
  const [messages, setMessages] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");
  const currentUser = "User123"; // Simulated current user
  const chatContainerStyles = {
    chatContainer: {
      width: "350px",
      height: "550px",
      flexShrink: 0,
      fontFamily: "Arial, sans-serif",
      /* Additional properties can be added here */
    },
    chatContainerHead: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "50px",
      width: "310px",
      borderBottom: "1px solid #F0F0F0",
      padding: "20px",
    },
    chatContainerBody: {
      padding: "20px",
      overflowY: "scroll",
      height: "350px",
        display:"flex",
        flexDirection:"column-reverse"
    },
    chatContainerFooter: {
      borderTop: "1px solid #F0F0F0",
      padding: "15px",
      height: "50px",
      width: "310px",
    },
    chatTopicText: {
      color: "#000",
      textAlign: "center",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal",
      letterSpacing: "-0.3px",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      gap: "10px",
    },
    scrollbar: {
      width: "0px",
    },
  };


  useEffect(() => {
    // if(sessionId !== ""){
    //   const initMsg ={ text: "Hi, How can I help you?", user: "User123" };
    //   setMessages(initMsg);
    // }
    // Simulated messages from an API call or WebSocket
    // const initialMessages = [
    //   { text: "Hi, How can I help you?", user: "Merchant" },
    //  ];
    // setMessages(initialMessages);
    if (env_type === "DEV") {
      setBaseUrl("https://api-cai-dev.spemai.com/api/v1/sdk/chat/") ;
    } else if (env_type === "UAT") {
      setBaseUrl("https://api-cai-uat.spemai.com/api/v1/sdk/chat/");
    } else {
      setBaseUrl("https://api-cai-live.spemai.com/api/v1/sdk/chat/");
    }
  }, []);

  
  const sendMessage = async (message) => {
    const newMessage = { text: message, user: currentUser };
    setMessages((prevMsg) =>[...prevMsg, newMessage]);
    var xhr = new XMLHttpRequest();
    

    xhr.open("POST", baseUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "x-api-key",
      api_key
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const responseObj = JSON.parse(xhr.responseText); // Parse the JSON response
        const responseMsg = responseObj?.data?.response_msg; 
          console.log("Response status:", responseObj.status);
          console.log("Response message:", responseMsg);
          if (responseObj.status === 100) {
            const responseMessage = {
              text: responseMsg,
              user: "OtherUser",
            };
            setMessages((prevMsg) =>[...prevMsg, responseMessage]);
          }
          // Handle successful response here
        } else {
          console.error("Error:", xhr.status, xhr.statusText);
          // Handle error response here
            const errorMessage = { text: 'Error fetching data:', user: "OtherUser" };
      setMessages((prevMsg) =>[...prevMsg, errorMessage]);
        }
      }
    };

    var send_data = JSON.stringify({
      chat_id: sessionId,
      agent_id: agent_id,
      client_id: client_id,
      message: message,
    });

    xhr.send(send_data);
  };

  return React.createElement(
    "div",
    { style: chatContainerStyles.chatContainer },
    React.createElement(
      "div",
      { style: chatContainerStyles.chatContainerHead },
      React.createElement(
        "div",
        { style: chatContainerStyles.chatTopicText },
        React.createElement(
          "span",
          null /* You can add attributes here if needed */,
          React.createElement("img", { src: arrow_left, width: 24, height: 24 })
        ),
        chat_name
      ),
      React.createElement("img", { src: full_exit, width: 24, height: 24 })
    ),
    React.createElement(
      "div",
      { style: chatContainerStyles.chatContainerBody },
      React.createElement(MessageList, {
        messages: messages,
        currentUser: currentUser,
      })
    ),
    React.createElement(
      "div",
      { style: chatContainerStyles.chatContainerFooter },
      React.createElement(SendMessageForm, { sendMessage: sendMessage })
    )
  );
};

export default ChatContainer;
