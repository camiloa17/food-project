import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const newTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      let updatedItems;
      if (existingCartItemIndex >= 0) {
        updatedItems = state.items.map((item) => {
          if (item.id === action.item.id) {
            return { ...item, amount: item.amount + action.item.amount };
          } else {
            return item;
          }
        });
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return { items: updatedItems, totalAmount: newTotalAmount };
    case 'REMOVE':
      const itemToRemove = {
        ...state.items.filter((item) => item.id === action.id)[0],
      };

      let itemsWithUpdatedItems;
      if (itemToRemove.amount === 1) {
        itemsWithUpdatedItems = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        itemsWithUpdatedItems = state.items.map((item) => {
          if (item.id === action.id) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        });
      }

      const newAmount =
        itemToRemove.amount > 1
          ? state.totalAmount - itemToRemove.price
          : state.totalAmount - itemToRemove.price * itemToRemove.amount;
      return { items: itemsWithUpdatedItems, totalAmount: newAmount };

    case 'CLEAR':
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id });
  };
  const clearCarHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCarHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
