import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

let sessionCount = 0;

wss.on('connection', (ws) => {
  sessionCount++;
  console.log(`Client connected. Active sessions: ${sessionCount}`);

  
  broadcastSessionCount();

  ws.on('close', () => {
    sessionCount--;
    console.log(`Client disconnected. Active sessions: ${sessionCount}`);
    broadcastSessionCount();
  });
});

function broadcastSessionCount() {
  const message = JSON.stringify({ type: 'session_count', count: sessionCount });
  wss.clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN === 1
      client.send(message);
    }
  });
}

console.log(`WebSocket server running on ws://localhost:${PORT}`);
