import { openDatabase } from '../database';

async function createSourcesTable(tx) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS sources(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`
    );
  });
}

async function insertSource(name) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO sources (name) VALUES (?)`,[name]
    );
  });
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

async function updateSource(id, name){
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
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