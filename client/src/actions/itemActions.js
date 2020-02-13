import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_AMOUNT, ITEMS_LOADING } from './types'

export const getItemsAction = () => dispatch => {
  dispatch(setItemsLoadingAction())
  axios
    .get('/api/items')
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
}

export const addItemAction = (item) => dispatch => {
  axios
    .post('/api/items/', item)
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
}

export const editAmountAction = ({ id, amount }) => dispatch => {
  axios
  .put(`/api/items/${id}`, { amount: amount })
  .then(res => {
    dispatch({
      type: EDIT_AMOUNT,
      payload: res.data
    })
  })
}

export const delItemAction = itemId => dispatch => {
  axios
    .delete(`/api/items/${itemId}`)
    .then(res => {
      dispatch({
        type: DEL_ITEM,
        payload: itemId     
      })
    })
}


export const setItemsLoadingAction = () => ({
  type: ITEMS_LOADING,
})

