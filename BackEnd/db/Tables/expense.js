import { db } from '../database'

const insertExpense = (amount, date, categoryId) => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO expense (amount, date, category_id) VALUES (?, ?, ?);`, [amount, date, categoryId],
        (tx, results) => {
          resolve(results);
          console.log('Expense inserted successfully');
        },
        (tx, error) => {
          reject(error);
          console.error('Error inserting the expense', error);
        }  
      );
    });
  });
}

const getExpense = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx =>{
      tx.executeSql(
        `SELECT expense.*, categories.name as categoryName, categories.icon as categoryIcon, categories.color as categoryColor FROM expense
        JOIN categories ON expense.category_id = categories.id
        ORDER BY date DESC;`,
        [],
        (tx, results) => {
          const rows = results.rows._array;
          //Filter out records with invalid amount
          const validRows = rows.filter(item => !isNaN(parseFloat(item.amount)));
          console.log('Valid Expense data: ', validRows); // Debugging statement
          resolve(validRows);
        },
        (tx, error) => {
          console.error('Error fetching expenses: ', error);
        }
      );
    });
  });
};

const getTotalExpense = () => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as totalExpense FROM expense;`,
        [],
        (tx, results) => {
          const totalExpense = results.rows.item(0).totalExpense;
          resolve(totalExpense);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

const getExpenseById = (id) => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expense WHERE id = ?;`,
        [id],
        (tx, results) => {
          if (results.rows.length > 0){
            resolve(results.rows.item(0)); //return the first result
          } else{
            reject('No expense found with the provided ID');
          }
        },
        (error) =>{
          reject(error);
        }
      );
    });
  });
};

const updateExpense = (id, amount, date, categoryId, callback = () => {}) => {
  try{
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE expense SET amount = ?, date = ?, category_id = ? WHERE id = ?;`,
        [amount, date, categoryId, id],
        (_, result) => {
          if(result.rowsAffected > 0){
            console.log('Expense updated successfully');
            callback(result);
          }else {
            console.error('Error updating Expense', error);
          }
        },
      );
    });
  } catch (error){
    console.error('Error in updating', error);
  }
  
}

const deleteExpense = (id) => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM expense WHERE id = ?;`,
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

const getExpenseByCategoryAndDateRange = (categoryId, startDate, endDate) => {
  return new Promise ((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as totalAmount FROM expense WHERE category_id = ? AND date BETWEEN ? AND ?; `,
        [categoryId, startDate, endDate],
        (_, {rows }) => {
          resolve(rows.item(0));
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export {insertExpense, getExpense, getExpenseById, updateExpense, deleteExpense, getTotalExpense, getExpenseByCategoryAndDateRange};