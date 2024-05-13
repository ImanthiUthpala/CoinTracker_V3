import { openDatabase } from '../database';

async function createGoalTable() {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS goal (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        target_amount REAL NOT NULL,
        due_date TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`
    );
  });
}

async function insertGoal(name, targetAmount, dueDate, categoryId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO goal (name, target_amount, due_date, category_id) VALUES (?, ?, ?, ?)`,
      [name, targetAmount, dueDate, categoryId]
    );
  });
}

async function getGoal() {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM goal`
    );
  });
  const rows = results.rows._array;
  return rows;
}

async function getGoalById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM goal WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

async function updateGoal(id, name, targetAmount, dueDate, categoryId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `UPDATE goal SET name = ?, target_amount = ?, due_date = ?, category_id = ? WHERE id = ?`,
      [name, targetAmount, dueDate, categoryId, id]
    );
  });
}

async function deleteGoal(id) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM goal WHERE id = ?`,
      [id]
    );
  });
}

export { createGoalTable, insertGoal, getGoal, getGoalById, updateGoal, deleteGoal };
