import { openDatabase } from '../database';

async function createBudgetTable() {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS budget (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        cash_limit REAL NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`
    );
  });
}

async function insertBudget(startDate, endDate, cashLimit, categoryId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO budget (start_date, end_date, cash_limit, category_id) VALUES (?, ?, ?, ?)`,
      [startDate, endDate, cashLimit, categoryId]
    );
  });
}

async function getBudget() {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM budget`
    );
  });
  const rows = results.rows._array;
  return rows;
}

async function getBudgetById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM budget WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

async function updateBudget(id, startDate, endDate, cashLimit, categoryId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `UPDATE budget SET start_date = ?, end_date = ?, cash_limit = ?, category_id = ? WHERE id = ?`,
      [startDate, endDate, cashLimit, categoryId, id]
    );
  });
}

async function deleteBudget(id) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM budget WHERE id = ?`,
      [id]
    );
  });
}

export { createBudgetTable, insertBudget, getBudget, getBudgetById, updateBudget, deleteBudget };
