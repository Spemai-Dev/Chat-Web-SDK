import React, { useState,useEffect } from "react";
import exampleImage from "./images/Frame 5172.png";
import exampleImage2 from "./images/Frame 5182.png";
import exampleImage3 from "./images/Group 3178.png";
import "./style.css";
import ChatContainer from "./ChatContainer";

const SpemaiChatSdk = (props) => {
  const { api_key, agent_id, uuid, user_id,env_type , chat_name } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const text = "Hello from MyComponent!";
  //const baseUrl = process.env.DEV_BASE_URL;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const openChat =()=>{
    setIsOpen(true);
    if(api_key !== "" && agent_id !== ""){
      createChatSession()
    }
  }
  const closeChat =()=>{
    setIsOpen(false);
  }

const createChatSession = async () => {
  const xhr = new XMLHttpRequest();
  
  xhr.open("GET", baseUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.setRequestHeader("x-api-key", api_key);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const responseObj = JSON.parse(xhr.responseText);
        //if(responseObj.status === 100){
          setSessionId(responseObj.session_id)
        //}
        console.log('Response:', xhr.responseText);
        // Handle successful response here
      } else {
        console.error('Error:', xhr.status, xhr.statusText);
        // Handle error response here
      }
    }
  };

  // const data = JSON.stringify({
  //   "client_id": client_id,// this is uuid
  //   "client_name": client_name,// this is user_id
  //   "agent_id": agent_id // this is knowledge base id
  // });
  const data = JSON.stringify({
    "uuid": uuid,// this is uuid
    "user_id": user_id,// this is user_id
  });

  xhr.send();
};

  useEffect(()=>{
    if (env_type === "DEV") {
      setBaseUrl("https://cai-core-gke-dev.spemai.com/api/v1/default-chat/get/sessionId/?uuid="+uuid+"&user_id="+user_id+"&knowledge_base_id="+agent_id) ;
    } else if (env_type === "UAT") {
      setBaseUrl("https://api.spemai.com/spemai-cai-corev1-proxy/api/v1/default-chat/get/sessionId/?uuid="+uuid+"&user_id="+user_id+"&knowledge_base_id="+agent_id);
    } else {
      setBaseUrl("https://api.spemai.com/spemai-cai-corev1-proxy/api/v1/default-chat/get/sessionId/?uuid="+uuid+"&user_id="+user_id+"&knowledge_base_id="+agent_id);
    }
    //createChatSession()
  },[])

  // Define CSS styles as JavaScript objects
  const styles = {
    chatPopup: {
      position: "fixed",
      bottom: "20px",
      right: "50px",
      zIndex: "999",
      // Add other styles as needed
    },
    iconSet: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // Add other styles as needed
    },
    chatIcon: {
      width: "130px",
      height: "64px",
      cursor: "pointer",
      // Add other styles as needed
    },
    chatCloseIcon: {
      width: "74px",
      height: "74px",
      cursor: "pointer",
      // Add other styles as needed
    },
    chatWindow: {
      position: "absolute",
      bottom: "80px",
      right: "0",
      width: "350px",
      height: "550px",
      flexShrink: "0",
      margin: "0 auto",
      borderRadius: "30px",
      background: "#fff",
      boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.15)",
      overflow: "hidden",
      // Add other styles as needed
    },
  };

  return React.createElement(
    "div",
    { style: styles.chatPopup },
    React.createElement(
      "div",
      { style: styles.iconSet },
      !isOpen && React.createElement("img", { style: styles.chatIcon, src: exampleImage2, alt: "Example",onClick: () => openChat() }),
      isOpen && React.createElement("img", { style: styles.chatCloseIcon, src: exampleImage3, alt: "Example",onClick: () => closeChat()  })
    ),
    isOpen && React.createElement(
      "div",
      { style: styles.chatWindow },
      React.createElement(
        ChatContainer,
        {api_key, agent_id, uuid, user_id,env_type,chat_name,sessionId},
      )
    )
  );
};

export default SpemaiChatSdk;
