import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, qunatity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      qunatity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// getState() to access the state

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  console.log(getState().cart.cartItems);
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
