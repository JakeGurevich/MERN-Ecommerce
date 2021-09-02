import { CART_ADD_ITEM } from "../constants/cartConstants";
import { CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemToAdd = action.payload;
      console.log(itemToAdd);
      console.log(state.cartItems);
      const existItem = state.cartItems.find((x) => x.id === itemToAdd.id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === itemToAdd.id ? itemToAdd : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, itemToAdd] };
      }
    default:
      return state;
  }
};
