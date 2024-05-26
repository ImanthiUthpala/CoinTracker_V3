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

  try {
    await openDatabase(); // Ensure the database is open

    await new Promise((resolve, reject) => {
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
            console.log('Sources table create successfully');
          },
          (_, error) => {
            reject(error);
          }
        );

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
          console.log('Income table created successfully');
          },
          (_, error) => {
          reject(error);
          }
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS categories(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            icon TEXT,
            color TEXT
          );`,
          [],
          () => {
            console.log('Categories table created successfully');
          },
          (_, error) => {
            reject(error);
          }
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS expense (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories(id)
          );`,
          [],
          () => {
            console.log('Expense table created successfully');
          },
          (_, error) => {
            reject(error);
          }
        );
        //next tx.executeSql....

    }, reject, resolve);
  });
    } // end of try
    catch (error) {
      console.error ('Error creating tables: ', error);
    }
  }; // end of createTables



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