// MyComponent.js
import React from 'react';
import SpemaiChatSdk from './SpemaiChatSdk';

const SpemaiCaiSdk = ({ data }) => {
  const { api_key, agent_id, client_id, client_name,env_type , chat_name } = data;
  return React.createElement(SpemaiChatSdk, { api_key, agent_id, client_id, client_name,env_type , chat_name });
};

export default SpemaiCaiSdk;
