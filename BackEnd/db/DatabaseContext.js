import React, {createContext, useState, useEffect} from "react";
import { openDatabase, closeDatabase } from './database';

const DatabaseContext = createContext(null);

const DatabaseProvider = ({children}) => {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try{
        const db = await openDatabase();
        setDatabase(db);
      }
      catch(error){
        console.error('Error initializing database:', error);
      }
    };
    initializeDatabase();
  }, []);
  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export {DatabaseContext, DatabaseProvider};