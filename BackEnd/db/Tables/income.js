import { openDatabase } from '../database';
import { db } from '../database'

/*
async function createIncomeTable() {
  await openDatabase();
  await db.transactionAsync(async tx =>{
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        source_id INTEGER NOT NULL,
        FOREIGN KEY (source_id) REFERENCES sources(id)
      );`
    );
  });
} */

const insertIncome = (amount, date, sourceId) => {
  return new Promise((resolve, reject) => {
    db.transaction( tx => {
      tx.executeSql(
        `INSERT INTO income (amount, date, source_id) VALUES (?, ?, ?);`, [amount, date, sourceId],
        (tx, results) => {
          resolve(results);
          console.log('Incone inserted successfully');
        },
        (tx, error) => {
          reject(error);
          console.error('Error inserting the income', error);
        }
      );
    });
  });

} ;

const getIncome = (callback) => {
  
  db.transaction(tx =>{
    tx.executeSql(
      `SELECT income.*, sources.name as sourceName FROM income JOIN sources ON income.source_id =source.id ORDER BY date DESC;`,
      [],
      (tx, results) => {
        const rows = results.rows._array;
        callback(rows);
      },
      (tx, error) =>{
        console.error('Error fetching incomes: ', error);
      }
    );
  });
};

const getTotalIncome = () => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as totalIncome FROM income;`,
        [],
        (tx, results) => {
          const totalIncome = results.rows.item(0).totalIncome;
          resolve(totalIncome);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

async function getIncomeById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM income WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

const updateIncome = (id, amount, date, sourceId) => {
  return new Promise ((resolve, reject) => {
    db.transaction( tx => {
      tx.executeSql(
        `UPDATE income SET amount = ?, date = ?, source_id = ? WHERE id = ?;`,
        [amount, date, sourceId, id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject (error);
        }
      );
    });
  });
  
};

const deleteIncome = (id) => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM income WHERE id = ?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
 
};

export {insertIncome, getIncome, getIncomeById, updateIncome, deleteIncome, getTotalIncome};