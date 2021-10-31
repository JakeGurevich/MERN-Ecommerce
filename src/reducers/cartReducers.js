import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemToAdd = action.payload;
      console.log(itemToAdd);
      console.log(state.cartItems);
      const existItem = state.cartItems.find(
        (item) => item.productId === itemToAdd.productId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === itemToAdd.productId ? itemToAdd : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemToAdd],
        };
      }
    case CART_REMOVE_ITEM:
      const id = action.payload;
      const updatedItems = state.cartItems.filter(
        (item) => item.productId === id
      );
      return {
        ...state,
        cartItems: [...updatedItems],
      };

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
