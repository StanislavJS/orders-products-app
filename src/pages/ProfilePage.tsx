import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';

interface User {
  name: string;
  email: string;
  location: string;
  phone: string;
  avatarUrl?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь пример реального API запроса к серверу
    fetch('https://randomuser.me/api/') // пример публичного API с юзером и фото
      .then(res => res.json())
      .then(data => {
        const result = data.results[0];
        setUser({
          name: `${result.name.first} ${result.name.last}`,
          email: result.email,
          location: `${result.location.city}, ${result.location.country}`,
          phone: result.phone,
          avatarUrl: result.picture.large,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Failed to load user data</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Profile</h2>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user.avatarUrl ? (
            <img
            src={user.avatarUrl}
            alt={`${user.name} avatar`}
            className={styles.avatarImage}
          />          
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#2c5d2c"
              viewBox="0 0 24 24"
              width="80"
              height="80"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <div className={styles.info}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
