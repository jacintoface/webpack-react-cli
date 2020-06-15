import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducer/index'
import createSagaMiddleware from 'redux-saga'
import { hello } from '../saga/index'

const getServerStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk, createLogger()))
  return store
}

const getClientStore = () => {
  const initState = (window && window.__INIT_STATE__) || {}
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, initState, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(hello)
  return store
}

export { getServerStore, getClientStore }
