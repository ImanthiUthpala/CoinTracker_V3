import { db } from '../database';

const insertGoal = (name, targetAmount, dueDate, icon, color, initialContribution) => {
  return new Promise ((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO goal (name, target_amount, due_date, icon, color, progress) VALUES (?, ?, ?, ?, ?,?);`,
          [name, targetAmount, dueDate, icon, color, initialContribution],
          (tx, result) => {
            resolve(result);
            console.log('Goal added successfully');
          },
          (tx, error) => {
            reject(error);
            console.error('Error insering goal: ', error);
          }
        );
      });
    } catch (error) {
      console.errror('Error addig goal', error);
    }
  }) ;
  
}

const getGoal = () => {
  return new Promise((resolve, rejet) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
         `SELECT * FROM goal`,
         [],
         (_, {rows: {_array} }) => {
          resolve(_array);
         },
         (_, error) => {
          rejet(error);
         }
       );
     });
    } catch (error) {
      console.error('Error in getGoal', error);
      rejet(error);
    }
  });
 
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

const updateGoal = (id, name, targetAmount, dueDate, icon, color, progress, callback =() => {}) => {
  try{
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE goal SET name = ?, target_amount = ?, due_date = ?, icon = ?, color = ?, progress = ? WHERE id = ?;`,
        [name, targetAmount, dueDate, icon, color, progress, id],
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

const contributeToGoal = (goalId, amount) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE goal SET progress = progress + ? WHERE id = ?;`,
        [amount, goalId],
        (tx, results) => {
          if(results.rowsAffected > 0) {
            resolve(true);
          } else {
            reject(new Error('Failed to update the goal progress'));
          }
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

const markGoalAsComplete = (goalId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE goal SET completed = 1 WHERE id = ?;`, [goalId],
        (tx, result) => {
          resolve(result);
          console.log('success');
        }, 
        (tx, error) => {
          reject(error);
          console.error('Error setting complete: ', error);
        }
        
      )
    })
  })
}

export { insertGoal, getGoal, getGoalById, updateGoal, deleteGoal, contributeToGoal, markGoalAsComplete };
