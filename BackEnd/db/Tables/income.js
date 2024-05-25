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

const getIncome = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT income.*, sources.name as sourceName, sources.icon as sourceIcon, sources.color as sourceColor
        FROM income 
        JOIN sources ON income.source_id = sources.id 
        ORDER BY date DESC;`,
        [],
        (tx, results) => {
          const rows = results.rows._array;
          //Filter out records with invalid amount
          const validRows = rows.filter(item => !isNaN(parseFloat(item.amount)));
          console.log('Valid Income data:', validRows); //Debugging statement
          resolve(validRows);
        },
        (tx, error) => {
          console.error('Error fetching incomes: ', error);
          reject(error);
        }
      );
    });
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

const getIncomeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM income WHERE id = ?;`,
        [id],
        (tx, results) => {
          if (results.rows.length > 0){
            resolve(results.rows.item(0)); //return the first result
          } else {
            reject('NO income found with the provided ID');
          }
        },
        (error) =>{
          reject(error);
        }
      );
    });
  });
 
};

/*const updateIncome = (id, amount, date, sourceId) => {
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
  
};*/

const updateIncome = (id, amount, date, sourceId, callback = () => {}) => {
  try{
    db.transaction( tx => {
      tx.executeSql(
        `UPDATE income SET amount = ?, date = ?, source_id = ? WHERE id = ?;`,
        [amount, date, sourceId, id], // bind parameters as an array
        (_, result) => {
          if(result.rowsAffected > 0){
            console.log('Source updated successfully');
            callback(result);
          }else{
            console.error("Error updating source");
          }
         
        },
      );
    });
  } catch(error){
    console.error('Erroro in updating', error);
  }

}

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