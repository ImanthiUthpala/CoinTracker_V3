import { openDatabase } from '../database';

async function createReminderTable() {
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS reminder (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        due_date TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        bill_id INTEGER, 
        FOREIGN KEY (bill_id) REFERENCES bill(id)
      );`
    );
  });
}

async function insertReminder(title, dueDate, completed = false, billId = null) {
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `INSERT INTO reminder (title, due_date, completed, bill_id) VALUES (?, ?, ?, ?)`,
      [title, dueDate, completed, billId]
    );
  });
}

async function getReminder() {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT * FROM reminder`
    );
  });
  const rows = results.rows._array;
  return rows;
}

async function getReminderById(id) {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT * FROM reminder WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

async function updateReminder(id, title, dueDate, completed, billId = null) {
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `UPDATE reminder SET title = ?, due_date = ?, completed = ?, bill_id = ? WHERE id = ?`,
      [title, dueDate, completed, billId, id]
    );
  });
}

async function deleteReminder(id) {
  await openDatabase();
  await db.transactionAsync(tx => {
    tx.executeSql(
      `DELETE FROM reminder WHERE id = ?`,
      [id]
    );
  });
}

export { createReminderTable, insertReminder, getReminder, getReminderById, updateReminder, deleteReminder };

