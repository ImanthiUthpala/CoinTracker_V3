import { db } from '../database'

const insertBudget = (startDate, endDate, cashLimit, categoryId) => {
  return new Promise((resolve, reject) => {

    // Validate and format data
    // const formattedStartDate = new Date(startDate).toISOString();
    // const formattedEndDate = new Date(endDate).toISOString();
    // const formattedCashLimit = parseFloat(cashLimit);

    // if (isNaN(formattedCashLimit)) {
    //   reject(new Error('Invalid cash limit'));
    //   return;
    // }
    
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO budget (start_date, end_date, cash_limit, category_id) VALUES (?, ?, ?, ?);`,
        [startDate, endDate, cashLimit, categoryId],
        (tx, results) => {
          resolve(results);
          console.log('Budget is inserted successfully Test');
        },
        (tx, error) => {
          reject(error);
          console.error('Error inserting the budget', error);
        }
      );
    });
  });
}

const getBudget = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM budget;`,
        [],
        (tx, results) => {
          console.log('SQL Query Results: ', results);
          if (results.rows && results.rows._array) {
            const rows = results.rows._array;
            console.log('Budget rows: ', rows);
            const validRows = rows.filter(item => 
              !isNaN(parseFloat(item.cash_limit)));
              console.log('Valid Budget data: ', validRows);
            resolve(validRows);
          } else {
            console.error('No rows found in the budget query results');
            resolve([]);
          }
        },
        (tx, error) => {
          reject(error);
          console.error('Error fetching budgers: ', error);
        }
      );
    });
  });
};

const getBudgetById = (id) => {
  return new Promise ( (resolve, reject) => {
    db.transaction(tx => {
      return tx.executeSql(
        `SELECT * FROM budget WHERE id = ?`,
        [id],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            reject('No budget found with the provided ID');
          }
        },
        (error) => {
          reject(error);
        }
      );
  })
  });
};

const updateBudget = (id, startDate, endDate, cashLimit, categoryId, callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE budget SET start_date = ?, end_date = ?, cash_limit = ?, category_id = ? WHERE id = ?;`,
        [startDate, endDate, cashLimit, categoryId, id],
        (_, result) => {
          if(result.rowsAffected > 0){
            console.log('Budget Updated successfully');
            callback(result);
          } else {
            console.error('Error updating Budget: ', error);
          }
        },
    );
  });
    } catch (error) {
      console.error('Error in updating: ', error);
    }
};

const deleteBudget = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM budget WHERE id = ?`,
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

export {insertBudget, getBudget, getBudgetById, updateBudget, deleteBudget };
