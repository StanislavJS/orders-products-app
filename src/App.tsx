import React from 'react';
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
import { useWebSocket } from './hooks/useWebSocket';

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { sessionCount } = useWebSocket(WEBSOCKET_URL);

  if (!user) {
    return (
      <>
        <TopMenu sessionCount={sessionCount} />
        <LoginModal /> {/* Модалка логина */}
      </>
    );
  }

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
