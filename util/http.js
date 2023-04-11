import axios from 'axios';

// const BACKEND_URL = 'https://rn-course-46ac3-default-rtdb.firebaseio.com';
const BACKEND_URL = 'https://brainexon-rncourse-default-rtdb.firebaseio.com';
// export const storeExpense = async (expenseData) => {
export async function dbStore(expenseData) {
  const storeExpensesUrl = `${BACKEND_URL}/expenses.json`;
  let response;
  let error;
  try {
    response = await axios.post(storeExpensesUrl, expenseData);
  } catch (err) {
    error = `[storeExpense] error: ${JSON.stringify(err.message)}`;
    console.log(error);
  }
  // "name === id" in google Firebase.
  return { error, data: response?.data };
}
export async function dbFetch() {
  // const expenses = [];
  const fetchUrl = `${BACKEND_URL}/expenses.json`;
  let error;
  let expenses;
  // use try/catch vs then/catch to capture entire error
  try {
    const response = await axios.get(fetchUrl, { timeout: 3000 });
    expenses = Object.keys(response.data).map((key) => ({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    }));
  } catch (err) {
    error = `[dbFetch] error: ${err.message}`;
    console.log(`[dbFetch] error: ${err.message}`);
  }
  return { error, data: expenses };
  // console.log(`[dbFetch] response: ${response}`);
  // return response.data;
}

export async function dbUpdate(id, expenseData) {
  console.log(`[dbUpdate] id: ${id} expenseData: ${JSON.stringify(expenseData)}`);
  let response;
  let error;
  try {
    // const updateUrl = `${BACKEND_URL}/expenses/${id}.json`;
    const updateUrl = `${BACKEND_URL}/expenses/${id}.json`;
    response = await axios.put(updateUrl, expenseData);
  } catch (err) {
    error = `[dbUpdate] error: ${err.message}`;
    console.log(error);
  }
  return { error, data: response?.data };
}

export async function dbDelete(id) {
  const deleteUrl = `${BACKEND_URL}/expenses/${id}.json`;
  let response;
  let error;
  try {
    response = await axios.delete(deleteUrl);
  } catch (err) {
    error = `[dbDelete] error: ${err.message}`;
    console.log(error);
  }
  return { error, data: response?.data };
}
