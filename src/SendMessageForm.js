import React, { useState } from 'react';
import send from "./images/Frame 5172.png";

const SendMessageForm = ({ sendMessage }) => {
  const sendMessageFormStyles = {
    sendMessageForm: {
      width: '100%',
      height: '55px',
      flexShrink: 0,
      borderRadius: '32px',
      border: '1px solid #EBEBEB',
      background: '#F4F4F4',
      display: 'flex',
      fontSize: '12px',
      fontStyle: 'normal',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px',
      marginBottom:'10px'
    },
    inputText: {
      width: '80%',
      background: '#F4F4F4',
      border: 'none',
      outline: 'none',
    },
    button: {
      border: 'none',
      outline: 'none',
      background: '#F4F4F4',
      cursor: 'pointer',
    },
    // Uncomment the following code block if you wish to include the hover style
    // buttonHover: {
    //   backgroundColor: '#0056b3',
    // },
  };
  
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };
 

  return React.createElement(
    'form',
    { style:sendMessageFormStyles.sendMessageForm, onSubmit: handleSubmit },
    React.createElement('input', {
      style:sendMessageFormStyles.inputText,
      type: 'text',
      placeholder: 'Type a message...',
      value: message,
      onChange: (e) => setMessage(e.target.value),
    }),
    React.createElement(
      'button',
      { type: 'submit',style:sendMessageFormStyles.button },
      React.createElement('img', { src: send, width: 31, height: 31 }) 
    )
  );
};

export default SendMessageForm;
