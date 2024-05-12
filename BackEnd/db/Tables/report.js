import { openDatabase } from '../database';

/* 
async function getIncomeReportByDateRange(startDate, endDate) {
  await openDatabase();
  const results = await db.transactionAsync(tx => {
    return tx.executeSql(
      `SELECT SUM(amount) AS total_income, date
       FROM income
       WHERE date >= ? AND date <= ?
       GROUP BY date
       ORDER BY date ASC`,
      [startDate, endDate]
    );
  });
  const rows = results.rows._array;
  return rows;
}
*/