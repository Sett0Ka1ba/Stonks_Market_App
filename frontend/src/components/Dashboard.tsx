import React, { useState, useEffect } from 'react';
import StockMarket from './StockMarket';
import Favorites from './Favorites';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Bienvenue, {user.username} !</h1>
      
      <div className="dashboard-content">
        <div className="section">
          <Favorites />
        </div>
        
        <div className="section">
          <StockMarket />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;