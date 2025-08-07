import { Type } from "./action.type";


export const initialState = {
    basket: []
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const itemExist = state.basket.find((item) => item.id === action.item.id);
      return {
        ...state,
        basket: itemExist
          ? state.basket.map((item) =>
              item.id === action.item.id
                ? { ...item, amount: item.amount + 1 }
                : item
            )
          : [...state.basket, { ...action.item, amount: 1 }],
      };
    //...state,
    // basket: [...state.basket, action.item]
    case Type.REMOVE_FROM_BASKET: {
      if (!action.id) return state; // Guard: If no ID provided, return unchanged state

      const itemFind = state.basket.find((item) => item.id === action.id); // Find the item
      if (!itemFind) return state; // Guard: If item not found, return unchanged state

      return {
        ...state,
        basket:
          itemFind.amount > 1
            ? state.basket.map(
                (
                  item // If amount > 1, decrease it
                ) =>
                  item.id === action.id
                    ? { ...item, amount: item.amount - 1 } // Decrease amount by 1
                    : item // Leave other items unchanged
              )
            : state.basket.filter((item) => item.id !== action.id), // If amount = 1, remove item
      };
    }
    case Type.EMPTY_FROM_BASKET:
      return {...state, basket: [] };
      
    case Type.SET_USER:
      return {...state, user: action.user}
    default:
      return state;
  }
};
