import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données simulées pour le graphique
const generateMockHistoricalData = (symbol: string, days: number = 30) => {
  const data = [];
  let basePrice = Math.random() * 100 + 50; // Prix de base entre 50 et 150
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    // Ajouter un peu de variation aléatoire
    const change = (Math.random() - 0.5) * 5;
    basePrice += change;
    
    data.push({
      date: currentDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      price: basePrice,
      volume: Math.floor(Math.random() * 1000000 + 500000)
    });
  }
  
  return data;
};

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const historicalData = generateMockHistoricalData(symbol);
  
  return (
    <div className="stock-chart">
      <h3>Évolution du prix de {symbol}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={historicalData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3498db" 
            activeDot={{ r: 8 }}
            name="Prix"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;