import { db } from '../database';

const insertCategory = (name, icon, color, callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO categories (name, icon, color) VALUES (?,?,?);`,[name, icon, color],
        (_, result) => {
          console.log('Category added successfully');
          callback(result);
        },
      );
    });
  } catch (error) {
    console.error('Error adding category', error);
  }
}

const getCategory = (callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM categories;`, [],
        (_, {rows: {_array} }) => {
          callback(_array);
        },
      );
    });
  } catch (error) {
    console.error('Error in getCategory', error);
    callback([]);
  }  
}

const getCategoryById = (id, callback = () => {}) => {
  try{
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM categories WHERE id = ?;`,
        [id],
        (_, {rows: {_array} }) => {
          callback(_array[0]);
        },
      );
    });
  } catch (error){
    console.error('Error fetching category by id: ', error);
  }
}

const deleteCategory = (id, callback = () => {}) => {
  try{
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM categories WHERE id = ?;`,
        [id]
      );
    });
  }catch (error){
    console.error('Error in deleting Category', error);
    callback([]);
  }
}

const updateCategory = (id, name, icon, color, callback = () => {}) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?;`, [name, icon, color, id], // bind parameters as an array
        (_, result) => {
          if (result.rowsAffected > 0){
            console.log("Expense category updated successfully");
            callback(result);
          }
          else{
            console.error("Error updating expense category");
          }
        },
      );
    });
  } catch (error){
    console.error('Error in updating category', error);
  }
}

export {insertCategory, getCategory, getCategoryById, deleteCategory, updateCategory};