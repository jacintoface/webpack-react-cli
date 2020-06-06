import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducer/index'

const getServerStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk, createLogger()))
  return store
}

const getClientStore = () => {
  const initState = (window && window.__INIT_STATE__) || {}
  const store = createStore(reducer, initState, applyMiddleware(thunk))
  return store
}

export { getServerStore, getClientStore }
