import { db } from '../database'

const insertSource = (name, icon, color, callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO sources (name, icon, color) VALUES (?,?,?);`, [name, icon, color],
        (_, result) => {
          console.log('Source added successfully!');
          callback(result);
        },
      );
    });

  } catch (error) {
    console.error('Error adding source:', error);
  }
}

const getSources = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM sources;`, [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Error in getSources', error);
      reject([]);
    }
  });
};

const getSourceById = (id, callback = () =>{}) => {
  try{
    db.transaction (tx => {
      tx.executeSql(
        `SELECT * FROM sources WHERE id = ?;`,
        [id],
        (_, {rows: {_array} }) => {
          callback(_array[0]);
        },
      );
    });
  } catch (error){
      console.error('Error fetching source by id: ', error)
  }
}

const deleteSource = (id, callback = () => {}) => {
  try{
     db.transactionAsync(async tx => {
      tx.executeSqlAsync(
        `DELETE FROM sources WHERE id = ?;`,
        [id]
      );
    });
  }catch (error) {
    console.error('Error in deleting Source', error);
    callback([]);
  }  
}

const updateSource = (id, name, icon, color, callback = () => {}) => {
    try{
      db.transaction( tx => {
        tx.executeSql(
          `UPDATE sources SET name = ?, icon = ?, color = ? WHERE id = ?;`, [name, icon, color, id], // bind parameters as an array
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

export { insertSource, getSources, getSourceById, deleteSource, updateSource };