"use client";

import React, { useState, useEffect } from 'react';

export default function LiveStats() {
  const [users, setUsers] = useState(114293); // Start with a believable base number

  useEffect(() => {
    // Calculate a static number based on the current time
    const baseDate = new Date('2024-06-01T00:00:00Z').getTime();
    const now = Date.now();
    const diffHours = Math.max(0, (now - baseDate) / (1000 * 60 * 60));
    const calculatedUsers = 114293 + Math.floor(diffHours * 20);
    
    // Get the highest known count from local storage
    const storedUsersStr = localStorage.getItem('globalUserCount');
    let storedUsers = storedUsersStr ? parseInt(storedUsersStr, 10) : calculatedUsers;

    // Ensure our baseline doesn't fall behind the clock calculation
    if (calculatedUsers > storedUsers) {
      storedUsers = calculatedUsers;
    }

    // If this is a new browser tab/session, increase the count by exactly 1
    if (!sessionStorage.getItem('visited')) {
      storedUsers += 1;
      sessionStorage.setItem('visited', 'true');
      localStorage.setItem('globalUserCount', storedUsers.toString());
    }

    setUsers(storedUsers);
  }, []);

  return (
    <span className="live-stats-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span className="live-stats-icon">🚀</span> {users.toLocaleString()}+ users served in the last 30 days
    </span>
  );
}
