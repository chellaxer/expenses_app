import axios from 'axios';

const BACKEND_URL = 'https://rn-course-46ac3-default-rtdb.firebaseio.com';
// export const storeExpense = async (expenseData) => {
export async function storeExpense(expenseData) {
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
export async function fetchExpenses() {
  // const expenses = [];
  const fetchUrl = `${BACKEND_URL}/expenses.json`;
  const response = await axios.get(fetchUrl);
  // return response.data;
  return Object.keys(response.data).map((key) => ({
    id: key,
    amount: response.data[key].amount,
    date: new Date(response.data[key].date),
    description: response.data[key].description,
  }));
}
