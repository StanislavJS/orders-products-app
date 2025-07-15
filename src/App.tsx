import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import TopMenu from './components/TopMenu/TopMenu';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import styles from './App.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import LoginModal from './components/LoginModal/LoginModal';




const WEBSOCKET_URL = import.meta.env.VITE_WS_URL;


const App: React.FC = () => {
  const [sessionCount, setSessionCount] = useState<number>(1);
  const wsRef = useRef<WebSocket | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    function connect() {
      wsRef.current = new WebSocket(WEBSOCKET_URL);

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connected');
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'session_count') {
            setSessionCount(data.count);
          }
        } catch (err) {
          console.error('⛔ Invalid WebSocket message:', err);
        }
      };

      wsRef.current.onerror = (err) => {
        console.error('⛔ WebSocket error:', err);
      };

      wsRef.current.onclose = () => {
        console.log('🔌 WebSocket disconnected, reconnecting in 3s...');
        setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      wsRef.current?.close();
    };
  }, []);

  if (!user) {
    return (
      <>
        <TopMenu sessionCount={sessionCount} />
        <LoginModal /> {/* Модалка логіну */}
      </>
    );
  }

  // Якщо залогінений, показуємо основний інтерфейс:
  return (
    <Router>
      <TopMenu sessionCount={sessionCount} />
      <div className={`container mt-3 d-flex ${styles.wrapper}`}>
        <nav className={styles.nav}>
          <NavigationMenu />
        </nav>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/orders" />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
