import { openDatabase } from './database';

async function createSourcesTable(tx) {
  await openDatabase();
  await db.transactionAsync( tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS sources(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`
    );
  });
}

async function insertSource(name) {
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `INSERT INTO sources (name) VALUES (?)`,[name]
    );
  });
}

async function getSources() {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT * FROM sources`
    );
  });
  const rows = results.rows._array; //convert reults to array of objects
  return rows;
}

async function getSourceById(id) {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT * FROM sources WHERE id = ?`,
      [id]
    );
  });
}

async function deleteSource(id){
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `DELETE FROM sources WHERE id = ?`,
      [id]
    );
  });
}

async function updateSource(id, name){
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `UPDATE sources SET name = ? WHERE id = ?`, [name, id], // bind parameters as an array
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