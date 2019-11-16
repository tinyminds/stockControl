import { stockItemsRef, authRef, provider } from "../config/firebase";
import { FETCH_STOCKITEMS, FETCH_USER } from "./types";

export const addStockitem = (newstockItem, uid) => async dispatch => {
  stockItemsRef
  
    .child(uid)
    .push()
    .set(newstockItem);
};

export const editStockitem = (stockItems, uid, itemID) => async dispatch => {
  stockItemsRef
    .child(uid).child(itemID)
    .update(stockItems);
};

export const deleteItem = (deleteItemId, uid) => async dispatch => {
  stockItemsRef
    .child(uid)
    .child(deleteItemId)
    .remove();
};

export const fetchStockItems = uid => async dispatch => {
  stockItemsRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_STOCKITEMS,
      payload: snapshot.val()
    });
  });
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
