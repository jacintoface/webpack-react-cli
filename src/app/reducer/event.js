import { handleActions } from 'redux-actions'

const state = {
  count: 0
}

export default handleActions({
  ADD (state, actions) {
    const oldCount = state.count
    const newCount = actions.payload + oldCount
    return Object.assign({}, state, {
      count: newCount
    })
  },
  REMOVE (state, actions) {
    const oldCount = state.count
    const newCount = oldCount - actions.payload
    return Object.assign({}, state, {
      count: newCount
    })
  }
}, state)
