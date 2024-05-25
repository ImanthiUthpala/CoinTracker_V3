import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'coinTracker.db'
export const db = SQLite.openDatabase(DATABASE_NAME);

async function openDatabase() {

  try {
    if (!db) {
      db = SQLite.openDatabase(DATABASE_NAME);
      console.log('Database opened successfully');

      await db.transactionAsync(async tx => {
        tx.executeSqlAsync(`PRAGMA foreign_keys = ON;`); // Enable foreign keys
      });
    }

  } catch (error) {

    console.error('Error opening database:', error);
  }

  return db; // return the database connectin if already open
}

export const createTables = async () =>{
  return new Promise ((resolve, reject) =>{
    db.transaction(tx =>{
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sources (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          icon TEXT,
          color TEXT
        );`,
        [],
        () => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS income (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              amount REAL NOT NULL,
              date TEXT NOT NULL,
              source_id INTEGER NOT NULL,
              FOREIGN KEY (source_id) REFERENCES sources(id)
            );`,
            [],
        
        () =>{
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    },
    (_, error) => {
      reject(error);
        }
      );
    });
  });

};

function closeDatabase() {
  if (db) {
    db._db.close().then(() => {
      console.log('Database closed successfully');
      db = null; // clear the reference for proper re-opening
    }).catch(error => {
      console.error('Error closing database:', error);
    });
  }
}
export { openDatabase, closeDatabase };