import { openDatabase } from '../database';
import { db } from '../database'

//const db = SQLite.openDatabase('coinTracker.db');
/*
async function createSourcesTable() {
  await openDatabaseAsync();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS sources(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        icon TEXT,
        color TEXT
      );`
    );
  });
} */

/*async function insertSource(name,icon,color) {
  
  try{
    await openDatabaseAsync();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO sources (name, icon, color) VALUES (?,?,?);`,[name, icon, color]
    );
  });
  console.log('Source added successfully!');
  }catch (error) {
    console.error('Error adding source:', error);
  }
  
}*/

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

const getSources = (callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM sources;`, [],  //removed *
        (_, { rows: { _array } }) => {
          callback(_array);
        },
      );
    });
    // const rows = results.rows._array; //convert reults to array of objects
    //r return rows;
  } catch (error) {
    console.error('Error in getSource', error);
    callback([]);
  }
}
/*
async function getSources() {
  await openDatabaseAsync();
  const results = await (await db).transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM sources`
    );
  });
  const rows = results.rows._array; //convert reults to array of objects
  return rows;
}*/

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
  /*const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM sources WHERE id = ?;`,
      [id]
    );
  });
  return results.rows._array[0]; // Later added, assuming only one source with that id */
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