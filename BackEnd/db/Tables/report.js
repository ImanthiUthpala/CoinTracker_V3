import { openDatabase } from '../database';

/* 
async function getIncomeReportByDateRange(startDate, endDate) {
  await openDatabase();
  const results = await db.transactionAsync(async tx => {
    return tx.executeSqlAsync(
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