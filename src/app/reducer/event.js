import { handleActions } from 'redux-actions'
let state = {
  count: 0
}

export default handleActions({
  ADD (state, actions) {
    let oldCount = state.count
    let newCount = actions.payload + oldCount
    return Object.assign({}, state, {
      count: newCount
    })
  },
  REMOVE (state, actions) {
    let oldCount = state.count
    let newCount = actions.payload - oldCount
    return Object.assign({}, state, {
      count: newCount
    })
  }
}, state)

