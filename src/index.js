import App from './app/app'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store from './app/store/store'
import {Provider} from 'react-redux'
const render = (App) => {
  ReactDOM.render(
      <AppContainer>
        <Provider>
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
