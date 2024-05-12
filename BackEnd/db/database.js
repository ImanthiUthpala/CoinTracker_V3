import * as SQLite from 'expo-sqlite';

let db;

async function openDatabase(){
  if (!db){
    try{
      db = await SQLite.openDatabaseAsync('coinTracker.db');
    await db.transactionAsync(tx => {
      tx.executeSql(`PRAGMA foreign_keys = ON;`
      ); // Enable foreign keys     
    });
    console.loog('Database opened successfully');
    }
    catch(error){
      console.error('Error opening database:' , error);
    }
  }
  return db; // return the database connectin if already open
}

export {openDatabase};