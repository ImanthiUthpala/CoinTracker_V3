import { openDatabase } from '../database';

async function createCategoriesTable(tx) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`
    );
  });
}

async function insertCategory(name) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO categories (name) VALUES (?)`,[name]
    );
  });
}

async function getCategory() {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM categories`
    );
  });
  const rows = results.rows._array; //convert reults to array of objects
  return rows;
}

async function getCategoryById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM categories WHERE id = ?`,
      [id]
    );
  });
}

async function deleteCategory(id){
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM categories WHERE id = ?`,
      [id]
    );
  });
}

async function updateCategory(id, name){
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
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