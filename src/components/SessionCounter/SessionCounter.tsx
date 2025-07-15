import React from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';


const WS_URL = 'wss://orders-products-app-production.up.railway.app';

export const SessionCounter: React.FC = () => {
  const { sessionCount } = useWebSocket(WS_URL);

  return (
    <div style={{padding: '1rem', background: '#eee', borderRadius: '4px'}}>
      Активных сессий: <strong>{sessionCount}</strong>
    </div>
  );
};
