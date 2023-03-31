import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Nike shoes',
    amount: 59.99,
    date: new Date('2023-12-19'),
  },
  {
    id: 'e2',
    description: 'Polo Slacks',
    amount: 89.99,
    date: new Date('2023-01-05'),
  },
  {
    id: 'e3',
    description: 'Grocery',
    amount: 6.99,
    date: new Date('2023-02-05'),
  },
  {
    id: 'e4',
    description: 'Moby Dick Novel',
    amount: 14.95,
    date: new Date('2023-03-19'),
  },
  {
    id: 'e5',
    description: 'How to Garden book',
    amount: 18.95,
    date: new Date('2023-03-28'),
  },
  {
    id: 'e6',
    description: 'Dress3Shoe',
    amount: 200.95,
    date: new Date('2023-03-25'),
  },
  {
    id: 'e7',
    description: 'Motorcycle Helmet',
    amount: 650.93,
    date: new Date('2022-03-20'),
  },
  {
    id: 'e8',
    description: 'Motorcycle Jacket',
    amount: 551.26,
    date: new Date('2023-03-02'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const newId = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: newId }, ...state];
    }
    case 'UPDATE': {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      // find the immutable expense-item by its index...
      const updatableExpense = state[updatableExpenseIndex];
      // generate an expense-item copy from the original immutable expense-item...
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      // create an expense-list copy thereby maintaining the original lists' immutability...
      const updatedExpenses = [...state];
      // ...and update the expense-item by index in the expense-list copy.
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    }
    case 'DELETE': {
      const id = action.payload;
      console.log(`[expensesReducer] DELETE  id: ${id}`);
      return state.filter((expense) => expense.id !== id);
    }
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  // state management logic...
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  function addExpenseItem(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }
  function deleteExpenseItem(id) {
    // console.log(`[ExpensesContextProvider][deleteExpenseItem]  id: ${id}`);
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateExpenseItem(expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpenseItem,
    deleteExpense: deleteExpenseItem,
    updateExpense: updateExpenseItem,
  };
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
