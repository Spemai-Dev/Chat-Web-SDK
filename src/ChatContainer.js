import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

import full_exit from "./images/fullscreen-exit-fill.png";
import arrow_left from "./images/arrow-left-s-line.png";


const ChatContainer = (props) => {
  //const baseUrl = process.env.DEV_BASE_URL;
  const { api_key, agent_id, uuid, user_id,env_type, chat_name,sessionId } = props;
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
      height: "40px",
      width: "310px",
      borderBottom: "1px solid #F0F0F0",
      padding: "20px",
    },
    chatContainerBody: {
      padding: "20px",
      overflowY: "scroll",
      height: "335px",
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
    
      // const initMsg ={ text: "I wish you a good day!", user: "OtherUser" };
      // setMessages((prevMsg) =>[...prevMsg, initMsg]);
    
    // Simulated messages from an API call or WebSocket
    // const initialMessages = [
    //   { text: "I wish you a good day!\nHow may I help you today?", user: "OtherUser" },
    //  ];
    // setMessages(initialMessages);
    if (env_type === "DEV") {
      setBaseUrl("https://cai-core-gke-dev.spemai.com/api/v1/default-chat/ask/") ;
    } else if (env_type === "UAT") {
      setBaseUrl("https://api.spemai.com/spemai-cai-corev1-proxy/api/v1/default-chat/ask/");
    } else {
      setBaseUrl("https://api.spemai.com/spemai-cai-corev1-proxy/api/v1/default-chat/ask/");
    }
  }, []);

  // const detectAndConvertLink=(text)=> {
  //   const urlRegex = /(https?:\/\/[^\s]+)/g;
  //   const parts = text.split(urlRegex);

  //   return parts.map((part, index) => {
  //       if (part.match(urlRegex)) {
  //           return React.createElement('a', {
  //               key: index,
  //               href: part,
  //               target: '_blank',
  //               rel: 'noopener noreferrer'
  //           }, part);
  //       }

  //       return part;
  //   });
  // }
  const detectAndConvertLink = (text) => {
    const urlRegex = /(?:https?:\/\/[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}|[^\s]+\.[^\s]{2,}(?<!\.)|\+\d{2}\s\d{3}\s\d{3}\s\d{3})/gi;
    const parts = text.split(/(\s+)/); // Split by whitespace and keep whitespace parts

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            let url = part;
            // Check if the URL starts with http:// or https://
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url; // Append http:// if not present
            }
            return React.createElement('a', {
                key: index,
                href: url,
                target: '_blank',
                rel: 'noopener noreferrer'
            }, part);
        } else if (part.match(/\b(?:\d{4}|\d{1,3}(?:,\d{3})+)(?:\.\d+)?\b/)) {
            // Sequence of 4 numbers detected
            return React.createElement('span', { key: index }, part);
        } else if (part.match(/\+\d{2}\s\d{3}\s\d{3}\s\d{3}/)) {
            // Contact number detected
            return React.createElement('span', { key: index }, part);
        }

        return part;
    });
}




  const sendMessage = async (message) => {
    const newMessage = { text: message, user: currentUser };
    setMessages((prevMsg) =>[...prevMsg, newMessage]);
    var xhr = new XMLHttpRequest();
    

    xhr.open("POST", baseUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader(
    //   "x-api-key",
    //   api_key
    // );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const responseObj = JSON.parse(xhr.responseText); // Parse the JSON response
        const responseMsg = responseObj?.answer; 
          console.log("Response status:", responseObj.status);
          console.log("Response message:", responseMsg);
          //if (responseObj.status === 100) {
            const responseMessage = {
              text: detectAndConvertLink(responseMsg),
              user: "OtherUser",
            };
            setMessages((prevMsg) =>[...prevMsg, responseMessage]);
          //}
          // Handle successful response here
        } else {
          console.error("Error:", xhr.status, xhr.statusText);
          // Handle error response here
            const errorMessage = { text: 'Error fetching data:', user: "OtherUser" };
      setMessages((prevMsg) =>[...prevMsg, errorMessage]);
        }
      }
    };

    // var send_data = JSON.stringify({
    //   chat_id: sessionId,
    //   agent_id: agent_id,
    //   client_id: uuid,
    //   message: message,
    // });
    var send_data = JSON.stringify({
      question: message,
      session_id: sessionId,
      uuid: uuid,
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
