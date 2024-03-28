import React from "react";

const MessageList = ({ messages, currentUser }) => {
  const messageListStyles = {
    messageList: {
      width: '264px',
      height: '232px',
      flexShrink: 0,
      borderRadius: '0px 8px 8px 8px',
      border: '1px solid #F0F0F0',
      background: '#FFF',
    },
    messageListItem: {
      marginBottom: '10px',
      padding: '8px 12px',
      borderRadius: '8px',
      backgroundColor: '#f0f0f0',
    },
    messageListStrong: {
      fontWeight: 'bold',
    },
    rightAlignedMessage: {
      textAlign: 'right',
      backgroundColor: '#d6eef9',
    },
    leftDiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      marginTop: '10px',
      marginBottom: '10px',
    },
    leftSideChat: {
      width: 'auto',
      maxWidth:'70%',
      flexShrink: 0,
      borderRadius: '0px 8px 8px 8px',
      border: '1px solid #F0F0F0',
      background: '#FFF',
      color: '#252525',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '-0.3px',
      padding: '5px',
      left: 0,
      textAlign:'left',
    },
    rightDiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
      alignItems: 'end',
      marginTop: '10px',
      marginBottom: '10px',
    },
    rightSideChat: {
      width: 'auto',
      maxWidth:'70%',
      flexShrink: 0,
      borderRadius: '0px 8px 8px 8px',
      background: '#178560',
      color: '#FFFFFF',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '-0.3px',
      padding: '5px',
      alignItems: 'end',
      textAlign:'left',
    },
    messageTimeText: {
      color: '#555',
      fontSize: '9px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      letterSpacing: '-0.3px',
      marginTop: '5px',
      marginBottom: '5px',
    },
  };

  const formatDateString = (inputDate) => {
    const date = new Date(inputDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}.${formattedMinutes} ${amOrPm}`;
  };
  const renderMessage = (message) => {
    const messageLines = message.text.split('\n'); // Split message by new lines
    const formattedMessage = messageLines.map((line, lineIndex) => (
        React.createElement('div', { key: lineIndex }, line)
    ));
    return formattedMessage;
};
  
  return React.createElement(
    'div',
    null,
    messages.map((message, index) =>
      message.user === currentUser ? (
        React.createElement(
          'div',
          { style: messageListStyles.rightDiv ,key: index },
          React.createElement('div', { style: messageListStyles.rightSideChat }, renderMessage(message.text)),
          React.createElement('div', { style: messageListStyles.messageTimeText}, formatDateString(Date.now()))
        )
      ) : (
        React.createElement(
          'div',
          { style: messageListStyles.leftDiv , key: index },
          React.createElement('div', { style: messageListStyles.leftSideChat}, message.text),
          React.createElement('div', { style: messageListStyles.messageTimeText },formatDateString(Date.now()))
        )
      )
    )
  );
  
};

export default MessageList;
