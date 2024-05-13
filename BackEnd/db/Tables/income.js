import { openDatabase } from '../database';

async function createIncomeTable() {
  await openDatabase();
  await db.transactionAsync(async tx =>{
    tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        source_id INTEGER NOT NULL,
        FOREIGN KEY (source_id) REFERENCES sources(id)
      );`
    );
  });
}

async function insertIncome(amount, date, sourceId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO income (amount, date, source_id) VALUES (?, ?, ?)`, [amount, date, sourceId]
    );
  });
}

async function getIncome() {
  await openDatabase();
  const results = await db.transactionAsync(async tx =>{
    return tx.executeSqlAsync(
      `SELECT * FROM income`
    );
  });
  const rows = results.rows._array;
  return rows;
}

async function getIncomeById(id) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
      `SELECT * FROM income WHERE id = ?`,
      [id]
    );
  });
  const row = results.rows.length > 0 ? results.rows._array[0] : null;
  return row;
}

async function updateIncome(id, amount, date, sourceId) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `UPDATE income SET amount = ?, date = ?, source_id = ? WHERE id = ?`,
      [amount, date, sourceId, id]
    );
  });
}

async function deleteIncome(id) {
  await openDatabase();
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `DELETE FROM income WHERE id = ?`,
      [id]
    );
  });
}

export {createIncomeTable, insertIncome, getIncome, getIncomeById, updateIncome, deleteIncome};