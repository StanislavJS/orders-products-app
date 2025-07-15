import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBoxOpen, FaClipboardList } from 'react-icons/fa'; 
import styles from './NavigationMenu.module.css';

const NavigationMenu: React.FC = () => {
  return (
    <nav className={styles.navMenu}>
      <NavLink 
        to="/orders" 
        className={({ isActive }) => isActive ? styles.active : styles.navLink}
      >
        <FaClipboardList className={styles.icon} />
        Orders
      </NavLink>
      <NavLink 
        to="/products" 
        className={({ isActive }) => isActive ? styles.active : styles.navLink}
      >
        <FaBoxOpen className={styles.icon} />
        Products
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => isActive ? styles.active : styles.navLink}
      >
        <FaUser className={styles.icon} />
        Profile
      </NavLink>
    </nav>
  );
};

export default NavigationMenu;
