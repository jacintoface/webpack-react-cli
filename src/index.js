import App from './app/app'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configStore from './app/store/store'
import {Provider} from 'react-redux'
const store = configStore()
const render = (App) => {
  ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App></App>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
  )
}
render(App)
if (module.hot) {
  module.hot.accept('./app/app.js',function () {
    let nextApp = require('./app/app').default
    render(nextApp)
  })
}
