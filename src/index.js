import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app'
import { getClientStore } from './app/store/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import route from './app/routes/router.config'

const render = (App) => {
  ReactDOM.render(
    <Provider store={getClientStore()}>
      <Router>
        <App routes={route.routes} />
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./app/app.js', function () {
    const nextApp = require('./app/app').default
    render(nextApp)
  })
}
