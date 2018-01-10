import {createAction} from 'redux-actions'

export const ADD = createAction('ADD')
export function add(count) {
  return (dispatch, getState) => {
    dispatch(ADD(count))
  }
}

export const REMOVE = createAction('REMOVE')
export function remove (count) {
  return (dispatch, getState) => {
    dispatch(REMOVE(count))
  }
}