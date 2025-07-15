import { useEffect, useState, useRef } from 'react';

interface SessionMessage {
  type: 'session_count';
  count: number;
}

export function useWebSocket(url: string) {
  const [sessionCount, setSessionCount] = useState<number>(0);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      try {
        const data: SessionMessage = JSON.parse(event.data);
        if (data.type === 'session_count') {
          setSessionCount(data.count);
        }
      } catch (e) {
        console.error('Invalid WebSocket message', e);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return { sessionCount };
}
