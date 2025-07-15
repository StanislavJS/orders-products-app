import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { logout } from '../../slices/authSlice';
import styles from './TopMenu.module.css';

interface TopMenuProps {
  sessionCount: number;
}

const TopMenu: React.FC<TopMenuProps> = ({ sessionCount }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = currentTime.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.topMenu}>
      <div className={styles.leftBlock}>
        <span>{dateStr} {currentTime.toLocaleTimeString()}</span>
      </div>
      <div className={styles.centerBlock}>
        <span>Active sessions: {sessionCount}</span>
      </div>
      <div className={styles.rightBlock}>
        {user ? (
          <>
            <span>Welcome, <strong>{user}</strong></span>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-light ms-2">
              Logout
            </button>
          </>
        ) : (
          <span>Please login</span>
        )}
      </div>
    </div>
  );
  
};

export default TopMenu;
