import axios from 'axios';

// const BACKEND_URL = 'https://rn-course-46ac3-default-rtdb.firebaseio.com';
const BACKEND_URL = 'https://brainexon-rncourse-default-rtdb.firebaseio.com';
// export const storeExpense = async (expenseData) => {
export async function dbStore(expenseData) {
  const storeExpensesUrl = `${BACKEND_URL}/expenses.json`;
  let response;
  try {
    response = await axios.post(storeExpensesUrl, expenseData);
  } catch (err) {
    console.log(`[storeExpense] error: ${err.message}`);
  }
  // "name === id" in google Firebase.
  return response.data?.name ?? '';
}
export async function dbFetch() {
  // const expenses = [];
  const fetchUrl = `${BACKEND_URL}/expenses.json`;
  let response;
  try {
    response = await axios.get(fetchUrl);
  } catch (err) {
    console.log(`[dbUpdate] error: ${err.message}`);
  }
  // return response.data;
  return Object.keys(response.data).map((key) => ({
    id: key,
    amount: response.data[key].amount,
    date: new Date(response.data[key].date),
    description: response.data[key].description,
  }));
}

export async function dbUpdate(id, expenseData) {
  console.log(`[dbUpdate] id: ${id} expenseData: ${JSON.stringify(expenseData)}`);
  let updated;
  try {
    const updateUrl = `${BACKEND_URL}/expenses/${id}.json`;
    updated = axios.put(updateUrl, expenseData);
  } catch (err) {
    console.log(`[dbUpdate] error: ${err.message}`);
  }
  return updated;
}

export async function dbDelete(id) {
  const deleteUrl = `${BACKEND_URL}/expenses/${id}.json`;
  let deleted;
  try {
    deleted = axios.delete(deleteUrl);
  } catch (err) {
    console.log(`[dbDelete] error: ${err.message}`);
  }
  return deleted;
}
