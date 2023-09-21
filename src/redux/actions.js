import {
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_AUTH_USER,
  LOGOUT,
  UPDATE_PRODUCT,
  GET_ALL_OWNERS,
  GET_ALL_USERS,
} from "./action-types.js";
import axios from "axios";

//-------------------------Product actions----------------------------
export const getAllProducts = (owner) => {
  //brings all products from db to the state
  return async function (dispatch) {
    let allProds = await axios.get(`/prodsowner/${owner}`);
    allProds = allProds.data;
    //brings all products from db
    const provs = Array.from(new Set(allProds.map((p) => p.provider.name)));
    //Creates an array of providers with no repeated values
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: { allProds, provs },
    });
  };
};

export const deleteProduct = (productId) => {
  return async function (dispatch) {
    const updatedProd = await axios.delete(`/product/${productId}`);
    const { data } = updatedProd;
    return dispatch({
      type: DELETE_PRODUCT,
      payload: data,
    });
  };
};

export const updateProduct = (product, ownerId) => {
  // console.log(product);
  // console.log(ownerId);
  return async function (dispatch) {
    await axios.patch(`/product/${product.id}`, product);
    const updatedProds = await axios.get(`/prodsowner/${Number(ownerId)}`);
    const { data } = updatedProds;
    // console.log(data);
    return dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
  };
};

//-------------------------User actions----------------------------
export const getAuthUser = (usr) => {
  //brings one specific user to the state
  return async function (dispatch) {
    let oneUsr = {};
    usr ? (oneUsr = (await axios.get(`/owner/${usr}`)).data) : null;
    sessionStorage.setItem("user", JSON.stringify(oneUsr));
    return dispatch({
      type: GET_AUTH_USER,
      payload: oneUsr,
    });
  };
};

//-------------------------Owner actions----------------------------
export const getAllOwners = () => {
  //brings all owners to the state
  return async function (dispatch) {
    const owners = (await axios.get("/owners")).data;
    return dispatch({
      type: GET_ALL_OWNERS,
      payload: owners,
    });
  };
};

export const getAllUsers = (ownerId) => {
  //brings all users (vendors) of the owner to the state
  // console.log("served by getAllUsers");
  return async function (dispatch) {
    const users = (await axios.get(`/users/${ownerId}`)).data;
    // console.log('usuarios', users);
    return dispatch({
      type: GET_ALL_USERS,
      payload: users,
    });
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
