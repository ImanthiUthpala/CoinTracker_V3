import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'coinTracker.db'
let db;

async function openDatabase(){
 
  try{
      if (!db){
      db = await SQLite.openDatabase(DATABASE_NAME);
      console.log('Database opened successfully');

      await db.transactionAsync((tx /* SQLite.Transaction */,tx) => {
      tx.executeSql(`PRAGMA foreign_keys = ON;`
      ); // Enable foreign keys     
    });
    }
  }
    catch(error){
      console.error('Error opening database:' , error);
    }
  
  return db; // return the database connectin if already open
}

function closeDatabase(){
  if (db){
    db.close().then(() => {
      console.log('Database closed successfully');
      db = null; // clear the reference for proper re-opening
    }).catch(error => {
      console.error('Error closing database:', error);
    });
  }
}
export {openDatabase, closeDatabase};