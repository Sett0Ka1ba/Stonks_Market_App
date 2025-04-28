export interface StockData {
    symbol: string;
    price: number;
    change: number;
    volume: number;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    favorites: string[];
  }