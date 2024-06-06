import { db } from '../database';

const insertBill = (name, amount, dueDate, reminderDate, icon, color, paid) => {
  return new Promise ((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO bill (name, amount, due_date, reminder_date, icon, color, paid) VALUES (?, ?, ?, ?, ?, ?, ?);`,
          [name,  amount, dueDate, reminderDate, icon, color,paid ? 1 : 0], // Default paid to false
          (tx, result) => {
            resolve(result);
            console.log('Bill added Successfully');
          },
          (tx, error) => {
            reject(error);
            console.error('Error adding bill: ', error);
          }
        );
      });
    } catch (error) {
      console.error('Error in adding bill', error);
    }
  });
};

const getBill = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM bill;`,
          [],
          (_, {rows: {_array} }) => {
            resolve(_array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Error in getBill: ', error);
      reject(error);
    }
  });
}

const getBillById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        return tx.executeSql(
          `SELECT * FROM bill WHERE id = ?`,
          [id],
          (_, { rows: { _array } }) => {
            if (_array && _array.length > 0) {
              resolve(_array[0]);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Error in getBillById:', error);
      reject(error);
    }
  });
};

const updateBill = (id, name, amount, dueDate, reminderDate, icon, color) => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE bill SET name = ?, amount = ?, due_date = ?, reminder_date = ?, icon = ?, color = ? WHERE id = ?`,
          [name, amount, dueDate, reminderDate, icon, color, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true); // Indicate that the update was successful
            } else {
              resolve(false); // Indicate that no rows were affected, possibly due to no matching ID
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Error in updating bill', error);
      reject(error);
    } 
  });
};

const updateBillPaidStatus = (id, paid) => {
  try{
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE bill SET paid = ? WHERE id = ?;`,
        [paid, id],
        (_, result) => {
          console.log('Updated paid sateus successfully');
        },
        (_, error) => {
          console.error('Error in updating paid status', error);
        }
      )
    })
  } catch (error) {
    console.error('Error in updating paid status', error);
  }
}
const deleteBill = (id) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM bill WHERE id = ?`,
        [id],
        (_, result) => {
          console.log('Bill deleted successfully');
        },
        (_, error) => {
          console.error('Error in deleting bill', error);
        }
      );
    });
  } catch (error) {
    console.error('Error in deleting Bill: ', error);
  } 
}

export {insertBill, getBill, getBillById, updateBill, deleteBill, updateBillPaidStatus };
