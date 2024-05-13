import React, {createContext, useState, useEffect} from "react";
import { openDatabase, closeDatabase } from './database';




/* React Context API provider for managing a db connection */

export const DatabaseContext = createContext(null); 

//a way to share data across components in a tree hierachy without explicity passing props through every level

const DatabaseProvider = ({children}) => { // serves as the provider for the DatabaseContext
  const [database, setDatabase] = useState(null); // useState --> manage state of database connection

  useEffect(() => {
    const initializeDatabase = async () => { // attemps to open database connection using openDatabse()
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
}; //value --> current state of the database
   //children prop --> recieve all child components wrapped within this provider 

export { DatabaseProvider};