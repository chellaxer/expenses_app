import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  /* eslint-disable */
  addExpense: ({ description, amount, date, id}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
  /* eslint-enable */
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      // const id = `e${Math.random().toFixed(2) * 100}`;
      // const id = new Date().toString().slice(0, 10) + Math.random().toFixed(2).toString();
      // const { id } = action.payload;
      // const newExpense = { ...action.payload, id };
      // return [{ ...newExpense }, ...state];
      return [action.payload, ...state];
    }
    case 'SET': {
      return action.payload.reverse();
    }
    case 'UPDATE': {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      // find the expense-item by its index...
      const updatableExpense = state[updatableExpenseIndex];
      // generate an expense-item copy from the original...
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      // create an expense-list copy thereby maintaining the original lists' immutability...
      const updatedExpenses = [...state];
      // ...and update the expense-item by index in the expense-list copy.
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      console.log(`[ExpensesContextProvider] [expensesReducer] updatedItem: ${JSON.stringify(updatedItem)}`);
      return updatedExpenses;
    }
    case 'DELETE': {
      const id = action.payload;
      return state.filter((expense) => expense.id !== id);
    }
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  // state management logic...
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }
  function addExpenseItem(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }
  function deleteExpenseItem(id) {
    // console.log(`[ExpensesContextProvider][deleteExpenseItem]  id: ${id}`);
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateExpenseItem(id, expenseData) {
    console.log(`[ExpensesContextProvider][updateExpenseItem] id: ${id} expenseData: ${JSON.stringify(expenseData)}`);
    dispatch({
      type: 'UPDATE',
      payload: {
        id,
        data: expenseData,
      },
    });
  }
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense: addExpenseItem,
    deleteExpense: deleteExpenseItem,
    updateExpense: updateExpenseItem,
  };
  return (
    <ExpensesContext.Provider
      value={value}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
