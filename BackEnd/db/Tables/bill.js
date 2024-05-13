import { openDatabase } from '../database';

async function createBillTable() {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS bill (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        due_date TEXT NOT NULL,
        amount REAL NOT NULL,
        paid BOOLEAN NOT NULL DEFAULT FALSE
      );`
    );
  });
}

async function insertBill(name, dueDate, amount) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO bill (name, due_date, amount, paid) VALUES (?, ?, ?, ?)`,
      [name, dueDate, amount, false] // Default paid to false
    );
  });
}

async function getBill() {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM bill`
    );
  });
  const rows = results.rows._array;
  return rows;
}

async function getBillById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM bill WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

async function updateBill(id, name, dueDate, amount, paid) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `UPDATE bill SET name = ?, due_date = ?, amount = ?, paid = ? WHERE id = ?`,
      [name, dueDate, amount, paid, id]
    );
  });
}

async function deleteBill(id) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM bill WHERE id = ?`,
      [id]
    );
  });
}

export { createBillTable, insertBill, getBill, getBillById, updateBill, deleteBill };
