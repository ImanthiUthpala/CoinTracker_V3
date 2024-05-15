import { openDatabase } from '../database';

async function createSourcesTable(tx) {
  await openDatabase();
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
}

async function insertSource(name,icon,color) {
  try{
    await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO sources (name, icon, color) VALUES (?,?,?)`,[name, icon, color]
    );
  });
  console.log('Source added successfully!');
  }catch (error) {
    console.error('Error adding source:', error);
  }
  
}

async function getSources() {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM sources`
    );
  });
  const rows = results.rows._array; //convert reults to array of objects
  return rows;
}

async function getSourceById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM sources WHERE id = ?`,
      [id]
    );
  });
  return results.rows._array[0]; // Later added, assuming only one source with that id
}

async function deleteSource(id){
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM sources WHERE id = ?`,
      [id]
    );
  });
}

async function updateSource(id, name, icon, color){
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `UPDATE sources SET name = ?, icon = ?, color = ? WHERE id = ?`, [name, icon, color, id], // bind parameters as an array
      (tx, results) =>{
        if (results.rowsAffected > 0){
          console.log("Income source updated successfully");
        }
        else{
          console.error("Error updating income source");
        }
      }
    );
  });
}

export {createSourcesTable, insertSource, getSources, getSourceById, deleteSource, updateSource};