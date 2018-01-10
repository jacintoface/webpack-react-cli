import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducer/index'
const enhancer = applyMiddleware(thunk, createLogger())

const configStore = () => {
  let store = createStore(reducer, enhancer)
  return store
}

export default configStore