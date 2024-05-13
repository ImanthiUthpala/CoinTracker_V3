import { openDatabase } from '../database';

async function createExpenseTable() {
  await openDatabase();
  await db.transactionAsync(async tx =>{
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS expense (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`
    );
  });
}

async function insertExpense(amount, date, categoryId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO expense (amount, date, category_id) VALUES (?, ?, ?)`, [amount, date, categoryId]
    );
  });
}

async function getExpense() {
  await openDatabase();
  const results = await db.transactionAsync(async tx =>{
    return tx.executeSqlAsync(
      `SELECT * FROM expense`
    );
  });
  const rows = results.rows._array;
  return rows;
}

async function getExpenseById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM expense WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

async function updateExpense(id, amount, date, categoryId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `UPDATE expense SET amount = ?, date = ?, category_id = ? WHERE id = ?`,
      [amount, date, categoryId, id]
    );
  });
}

async function deleteExpense(id) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM expense WHERE id = ?`,
      [id]
    );
  });
}

export {createExpenseTable, insertExpense, getExpense, getExpenseById, updateExpense, deleteExpense};