import { db } from '../database';

const insertGoal = (name, targetAmount, dueDate, icon, color, callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO goal (name, target_amount, due_date, icon, color) VALUES (?, ?, ?, ?, ?);`,
        [name, targetAmount, dueDate, icon, color],
        (_, result) => {
          console.log('Goal added successfully');
          callback(result);
        },
      );
    });
  } catch (error) {
    console.errror('Error addig goal', error);
  }
}

const getGoal = (callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
       `SELECT * FROM goal`, [],
       (_, {rows: {_array} }) => {
        callback(_array);
       },
     );
   });
  } catch (error) {
    console.error('Error in getGoal', error);
    callback([]);
  }
};

const getGoalById = (id, callback = () => {}) => {
  return new Promise ((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM goal WHERE id = ?`,
          [id],
          (_, {rows: {_array} }) => {
            if(_array.length > 0) {
              resolve(_array[0]);
            } else {
              resolve(null); // no goal found with the given id
            }
            callback(_array[0]);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    } catch (error){
      console.error('Error fetching goal by id: ', error);
      reject(error);
    }
  });
};

const updateGoal = (id, name, targetAmount, dueDate, icon, color, callback =() => {}) => {
  try{
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE goal SET name = ?, target_amount = ?, due_date = ?, icon = ?, color = ? WHERE id = ?;`,
        [name, targetAmount, dueDate, icon, color, id],
        (_, result) => {
          if (result.rowsAffected > 0){
            console.log('Goal updated successfully');
            callback(result);
          } else {
            console.error('Error updating Goal');
          }
        },
      );
    });
  } catch (error) {
    console.error('Error in updating goal', error);
  }
};

const deleteGoal = (id, callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM goal WHERE id = ?`,
        [id]
      );
    });
  } catch (error){
    console.error('Error in deleting Goal', error);
    callback([]);
  }  
};

export { insertGoal, getGoal, getGoalById, updateGoal, deleteGoal };
