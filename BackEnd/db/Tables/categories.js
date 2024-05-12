import { openDatabase } from '../database';

async function createCategoriesTable(tx) {
  await openDatabase();
  await db.transactionAsync( tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`
    );
  });
}

async function insertCategory(name) {
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `INSERT INTO categories (name) VALUES (?)`,[name]
    );
  });
}

async function getCategory() {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT * FROM categories`
    );
  });
  const rows = results.rows._array; //convert reults to array of objects
  return rows;
}

async function getCategoryById(id) {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT * FROM categories WHERE id = ?`,
      [id]
    );
  });
}

async function deleteCategory(id){
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `DELETE FROM categories WHERE id = ?`,
      [id]
    );
  });
}

async function updateCategory(id, name){
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `UPDATE categories SET name = ? WHERE id = ?`, [name, id], // bind parameters as an array
      (tx, results) =>{
        if (results.rowsAffected > 0){
          console.log("Expense category updated successfully");
        }
        else{
          console.error("Error updating expense category");
        }
      }
    );
  });
}

export {createCategoriesTable, insertCategory, getCategory, getCategoryById, deleteCategory, updateCategory};