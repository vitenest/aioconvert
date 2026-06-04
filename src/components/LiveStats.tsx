"use client";

import React, { useState, useEffect } from 'react';

export default function LiveStats() {
  const [users, setUsers] = useState(114293); // Start with a believable base number

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live activity by randomly increasing the number
      // Check every 2 seconds, 40% chance to increase by 1 to 3 users
      if (Math.random() > 0.6) {
        setUsers(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '1.2rem' }}>🚀</span> {users.toLocaleString()} users used this website
    </span>
  );
}
